
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MovieCard = ({ movie, onPress }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Verifica se o filme já está favoritado
  useEffect(() => {
    const checkFavorite = async () => {
      const stored = await AsyncStorage.getItem("@favorites");
      const favorites = stored ? JSON.parse(stored) : [];
      const exists = favorites.some((fav) => fav.imdbID === movie.imdbID);
      setIsFavorite(exists);
    };
    checkFavorite();
  }, []);

  const toggleFavorite = async () => {
    const stored = await AsyncStorage.getItem("@favorites");
    const favorites = stored ? JSON.parse(stored) : [];

    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
    } else {
      updatedFavorites = [...favorites, movie];
    }

    await AsyncStorage.setItem("@favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image
        source={{
          uri:
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/100x150",
        }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.Title}</Text>
        <Text style={styles.year}>{movie.Year}</Text>
        <Text style={styles.type}>
          {movie.Type === "movie"
            ? "Filme"
            : movie.Type === "series"
            ? "Série"
            : "Outro"}
        </Text>
      </View>
      <TouchableOpacity onPress={toggleFavorite} style={styles.heartIcon}>
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={24}
          color="red"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    paddingRight: 10,
  },
  poster: {
    width: 100,
    height: 150,
  },
  info: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  year: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  type: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
  },
  heartIcon: {
    padding: 8,
  },
});
