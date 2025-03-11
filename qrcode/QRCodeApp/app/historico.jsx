import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  Share,
  Linking,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Historico() {
  const router = useRouter();
  const { qrList } = useLocalSearchParams();
  const [qrListArray, setQrListArray] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (qrList) {
      setQrListArray(JSON.parse(qrList));
    } else {
      setQrListArray([]);
    }
  }, [qrList]);

  // const limparHistorico = async () => {
  //   Alert.alert("Confirmação", "Tem certeza que deseja limpar o histórico?", [
  //     { text: "Cancelar", style: "cancel" },
  //     {
  //       text: "OK",
  //       onPress: async () => {
  //         await AsyncStorage.removeItem("qrList"); // Remove do AsyncStorage
  //         setQrListArray([]); // Limpa a lista da tela
  //       },
  //     },
  //   ]);
  // };


  const limparHistorico = () => {
    Alert.alert("Confirmação", "Tem certeza que deseja limpar o histórico?", [
      { text: "Cancelar", style: "cancel" },
      { text: "OK", onPress: () => setQrListArray([]) },
    ]);
  };

  const compartilharQRCode = async (url) => {
    try {
      await Share.share({
        message: `Confira esse QR Code: ${url}`,
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível compartilhar o QR Code.");
    }
  };

  const renderItem = ({ item, index }) => {
    const { url, timestamp } = item; 
    return (
      <View style={styles.listItem}>
        <Text style={[styles.timestampText, darkMode && styles.darkContainer]}>
          {timestamp}
        </Text>
        <TouchableOpacity
          onPress={async () => {
            const validURL = await Linking.canOpenURL(url);
            if (validURL) {
              Linking.openURL(url);
            } else {
              Alert.alert("URL inválida", "Não foi possível abrir o link.");
            }
          }}
          onLongPress={() => compartilharQRCode(url)}
        >
          <Text
            style={[
              styles.listText,
              { color: "blue", textDecorationLine: "underline" },
              darkMode && { color: "cyan" },
            ]}
          >
            {url}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.historyContainer, darkMode && styles.darkContainer]}>
      <Text style={[styles.historyTitle, darkMode && styles.darkText]}>
        Histórico de QR Codes Escaneados
      </Text>

      <FlatList
        data={qrListArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={[styles.listText, darkMode && styles.darkText]}>
            Nenhum QR Code escaneado ainda
          </Text>
        }
        
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={limparHistorico}>
          <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setDarkMode(!darkMode)}
        >
          <Ionicons
            name={darkMode ? "sunny" : "moon"}
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#000",
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  darkText: {
    color: "#fff",
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listText: {
    fontSize: 16,
  },
  timestampText: {
    fontSize: 12,
    color: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  iconButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
  },
});
