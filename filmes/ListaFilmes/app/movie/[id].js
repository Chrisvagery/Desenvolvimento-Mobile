
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getMovieDetails } from "../../services/api";
import MovieCard from "../../components/MovieCard";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const MovieDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message || "Erro ao carregar detalhes");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  if (error) {
    return <Text style={{ color: "red", padding: 20 }}>{error}</Text>;
  }

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{movie.Title}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <MovieCard movie={movie} />

        <Text style={styles.text}>
          <Text style={styles.label}>Diretor:</Text> {movie.Director}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Atores:</Text> {movie.Actors}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>País:</Text> {movie.Country}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Idioma:</Text> {movie.Language}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Sinopse:</Text> {movie.Plot}
        </Text>

        {/* <Image
          source={{
            uri:
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450",
          }}
          style={styles.poster}
        />
        <Text style={styles.text}>
          <Text style={styles.label}>Título:</Text> {movie.Title}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Ano:</Text> {movie.Year}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Gênero:</Text> {movie.Genre}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Diretor:</Text> {movie.Director}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Atores:</Text> {movie.Actors}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>País:</Text> {movie.Country}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Idioma:</Text> {movie.Language}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Sinopse:</Text> {movie.Plot}
        </Text> */}
      </ScrollView>
    </View>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    zIndex: 10,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 22,
    color: "#fff",
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  poster: {
    width: 370,
    height: 450,
    marginBottom: 20,
    borderRadius: 12,
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "left",
  },
  label: {
    fontWeight: "bold",
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
});
