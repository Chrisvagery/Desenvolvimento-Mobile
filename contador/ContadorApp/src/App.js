import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Botao from "./components/botao/index.jsx";

export default function App() {
  const [contador, setContador] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [incremento, setIncremento] = useState("1");
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [historico, setHistorico] = useState([]);

  const LIMITE_MINIMO = -10;
  const LIMITE_MAXIMO = 10;


  const atualizarHistorico = (novoValor) => {
    setHistorico((prevHistorico) => {
      const novoHistorico = [novoValor, ...prevHistorico];
      return novoHistorico.length > 5
        ? novoHistorico.slice(0, 5)
        : novoHistorico;
    });
  };


  const menos = () => {
    const valor = parseInt(incremento) || 1;
    if (contador > -10) {
      const novoValor = contador - valor;
      setContador = (novoValor);
      atualizarHistorico(novoValor);
      //setContador(contador - valor);
      setMensagem("");
    } else {
      setMensagem("Limite mínimo alcançado!");
    }
  };
  
  const mais = () => {
    const valor = parseInt(incremento) || 1;
    setContador(anterior => {
      if(anterior  <= 10) {
        const novoValor = anterior + valor;
        atualizarHistorico(novoValor);
        console.log(novoValor);
        return novoValor;

      }else {
        setMensagem("Limite máximo alcançado!");
        return anterior;
      }
    });
  };
   


  const reset = () => {
    setContador(0);
    setMensagem("");
    setHistorico([]);

  }
  const toggleTema = () => {

    setTemaEscuro((prev) => !prev);
   };
   
  return (
    <View style={[styles.container, temaEscuro ? styles.temaEscuro : null]}>
      <Text style={[styles.text, temaEscuro ? styles.textoEscuro : null]}>Chrismene </Text>
      <Text style={[ styles.text,  styles.textContador, temaEscuro ? styles.textoEscuro : null,]} > {contador} </Text>
      {mensagem ? (
        <Text style={[styles.mensagem, temaEscuro ? styles.textoEscuro : null]}>
          {mensagem}
        </Text>
      ) : null}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={incremento}
        onChangeText={setIncremento}
        placeholder="Digite o incremento" />

      <View style={styles.grupo}>
        <Botao title="-" onPress={() => menos()} estilo={styles.btnMenos} />
        <Botao title="Reset" onPress={reset} estilo={styles.btnReset} />
        <Botao title="+" onPress={() => mais()} estilo={styles.btnMais} />
      </View>
      <Botao title="Mudar Tema" onPress={toggleTema} estilo={styles.btnTema} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  temaEscuro: {
    backgroundColor: "#333",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
  textContador: {
    fontWeight: "bold",
    fontSize: 40,
  },
  mensagem: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "60%",
    textAlign: "center",
    marginVertical: 10,
  },
  grupo: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  btnMenos: {
    backgroundColor: "red",
  },
  btnMais: {
    backgroundColor: "green",
  },
  btnReset: {
    backgroundColor: "gray",
  },
  btnTema: {
    backgroundColor: "blue",
    marginTop: 20,
  },
});
