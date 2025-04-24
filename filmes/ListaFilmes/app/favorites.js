import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MovieCard from "../components/MovieCard";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();
  const navigation = useNavigation(); 
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true); 
      const stored = await AsyncStorage.getItem("@favorites");
      setFavorites(stored ? JSON.parse(stored) : []);
      setLoading(false); 
    };

    loadFavorites();
  }, []);
  
if (loading) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#4CAF50" />
    </View>
  );
}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favoritos ❤️</Text>
      </View>

      {favorites.length === 0 ? (
        <Text style={styles.empty}>Nenhum filme favoritado ainda.</Text>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingTop: 20 }} 
          data={favorites}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() => router.push(`/movie/${item.imdbID}`)}
            />
          )}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 12,
  },
  empty: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
    color: "#888",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
