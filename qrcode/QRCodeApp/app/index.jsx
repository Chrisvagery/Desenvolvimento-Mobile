import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrList, setQrList] = useState([]);
  const router = useRouter();

  const loadQrList = async () => {
    try {
      const storedQrList = await AsyncStorage.getItem("qrList");
      if (storedQrList) {
        setQrList(JSON.parse(storedQrList)); // Converte de string JSON para array
      }
    } catch (error) {
      console.error("Erro ao carregar qrList do AsyncStorage:", error);
    }
  };

  const saveQrList = async (list) => {
    try {
      await AsyncStorage.setItem("qrList", JSON.stringify(list)); // Converte array para string JSON
    } catch (error) {
      console.error("Erro ao salvar qrList no AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadQrList();
  }, []);

  useEffect(() => {
    saveQrList(qrList);
  }, [qrList]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Precisamos da sua permissão para usar a câmera
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Ionicons name="camera" size={24} color="white" />
          <Text style={styles.text}>Conceder permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setQrData(data);
    setQrList((prevList) => [
      ...prevList,
      { url: data, timestamp: new Date().toLocaleString() },
    ]);
    Alert.alert("QR Code Escaneado", `Conteúdo: ${data}`, [
      { text: "OK", onPress: () => console.log("OK pressed") },
    ]);
  };

  const irParaHistorico = () => {
    router.push({
      pathname: "/historico",
      params: { qrList: JSON.stringify(qrList) },
    });
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          Total de QR Codes: {qrList.length}
        </Text>
      </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.flipButton}
          onPress={toggleCameraFacing}
        >
          <Ionicons name="camera-reverse" size={30} color="white" />
        </TouchableOpacity>
        {scanned && (
          <>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setScanned(false)}
            >
              <Ionicons name="scan-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={irParaHistorico}
            >
              <Ionicons name="list-outline" size={24} color="white" />
            </TouchableOpacity>
          </>
        )}
      </View>
      {qrData !== "" && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Último QR lido: {qrData}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 8,
  },
  controlsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
  },
  iconButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    minWidth: 100,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  resultContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  resultText: {
    fontSize: 16,
    color: "#000",
  },
  counterContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "yellow",
  },
  counterText: {
    fontSize: 16,
    color: "#555",
  },
  flipButton: {
    position: "absolute",
    top: 10,
    right: 2,
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    borderRadius: 50,
    padding: 20,
  },
});

