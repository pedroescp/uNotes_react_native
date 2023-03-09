import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
export default function Login() {
  const onPress = () => {
    console.log("Botão de adicionar pressionado");
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Entrar</Text>
        <View style={styles.inputs}>
          <View style={styles.divider}></View>
          <Text style={styles.labels}>Usuario/E-email</Text>
          <TextInput
            placeholderTextColor={"#9ea1a6"}
            style={styles.inputTitle}
          />
        </View>
        <View>
          <Text style={styles.labels}>Senha</Text>
          <TextInput
            placeholderTextColor={"#9ea1a6"}
            style={styles.inputTitle}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonEnter}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonClose: {
    backgroundColor: "#2196F3",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
    color: "#f28c18",
    padding: 10,
  },

  card: {
    backgroundColor: "#262b36",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    borderRadius: 50,
    padding: 10,
    height: 500,
    width: "100%",
  },

  content: {
    flex: 1,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    size: 3,
  },

  button: {
    borderRadius: 10,
    backgroundColor: "#f28c18",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    fontSize: 40,
    fontWeight: "900",
    margin: 10,
    width: 250,
    height: 50,
  },

  inputTitle: {
    width: 250,
    height: 60,
    padding: 0,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "500",
    color: "#b6c4dd",
    borderColor: "#b6c4dd",
    borderWidth: 0.3,
    borderRadius: 12,
  },

  labels: {
    color: "#b6c4dd",
    width: "100%",
    textAlign: "left",
    fontSize: 20,
  },

  inputs: {},

  title: {
    fontSize: 40,
    color: "#b6c4dd",
  },

  divider: {
    borderBottomColor: "#b6c4dd",
    borderBottomWidth: 1,
    marginVertical: 20,
  },

  buttonEnter: {
    fontSize: 20,
  },
});
