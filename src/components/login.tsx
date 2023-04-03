import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { NavigationContext } from "@react-navigation/native";
import { AuthContext } from "../content/auth";
import { AuthProvider } from "../content/auth";
import { getData } from "../utils/asyncStorage";

export default function Login() {
  const { login }: any = useContext(AuthContext);
  const navigation = useContext(NavigationContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setRegister] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      let user = await getData("token");

      if (user) navigation?.navigate("Home");
    };
    getUser();
  });

  async function handleLogin() {
    if (email == "" || password == "") {
    }

    login(email, password, navigation);
  }

  return (
    <AuthProvider>
      <View style={styles.container}>
        <View style={{...styles.card, height: showRegister ? 600 : 500}}>
          {!showRegister && (
            <>
              <Text style={styles.title}>Entrar</Text>
              <View style={styles.inputs}>
                <View style={styles.divider}></View>
                <Text style={styles.labels}>Usuario/E-email</Text>
                <TextInput
                  placeholderTextColor={"#9ea1a6"}
                  value={email}
                  onChangeText={setEmail}
                  style={styles.inputTitle}
                />
              </View>
              <View>
                <Text style={styles.labels}>Senha</Text>
                <TextInput
                  placeholderTextColor={"#9ea1a6"}
                  onChangeText={setPassword}
                  value={password}
                  style={styles.inputTitle}
                  secureTextEntry={true}
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonEnter}>Entrar</Text>
              </TouchableOpacity>
            </>
          )}
          {showRegister && (
            <>
              <Text style={{...styles.title}}>Registro</Text>
              <View style={styles.inputs}>
                <View style={styles.divider}></View>
                <Text style={styles.labels}>Usuario</Text>
                <TextInput
                  placeholderTextColor={"#9ea1a6"}
                  value={email}
                  onChangeText={setEmail}
                  style={styles.inputTitle}
                />
              </View>
              <View>
                <Text style={styles.labels}>E-mail</Text>
                <TextInput
                  placeholderTextColor={"#9ea1a6"}
                  onChangeText={setPassword}
                  value={password}
                  style={styles.inputTitle}
                  secureTextEntry={true}
                />
              </View>

              <View>
                <Text style={styles.labels}>Senha</Text>
                <TextInput
                  placeholderTextColor={"#9ea1a6"}
                  onChangeText={setPassword}
                  value={password}
                  style={styles.inputTitle}
                  secureTextEntry={true}
                />
              </View>

              <View>
                <Text style={styles.labels}>Repita a senha</Text>
                <TextInput
                  placeholderTextColor={"#9ea1a6"}
                  onChangeText={setPassword}
                  value={password}
                  style={styles.inputTitle}
                  secureTextEntry={true}
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonEnter}>REGISTRAR E ENTRAR !</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </AuthProvider>
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
    paddingHorizontal: 10,
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
    fontSize: 30,
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

  esqueci: {
    color: "#b6c4dd",
  },

  buttonEsqueci: {
    display: "flex",
    marginVertical: 10,
    width: "100%",
  },
});
