import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Text, BackHandler } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { NavigationContext, useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../content/auth";
import { AuthProvider } from "../content/auth";
import { getData, removeData } from "../utils/asyncStorage";
import api from "../utils/api";
import Loading from "./Loading";
import { Ionicons } from "@expo/vector-icons";
import ModalError from "./modalError";


export default function Login() {
  const { login }: any = useContext(AuthContext);
  const navigation = useContext(NavigationContext);

  const [showRegister, setRegister] = useState(false);

  //login
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const [loading, setLoading] = useState(false);

  //register
  const [usuarioRegister, setUsuarioRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [passwordRegisterTwo, setPasswordRegisterTwo] = useState("");
  const [disabledCamps, setDisabledCamps] = useState(false)
  const [loginEye, setLoginEye] = useState(true)
  const [registerEye, setRegisterEye] = useState(true)

  const [openErrorModal, setOpenErrorModal] = useState(false)
  const [title, setTitle] = useState('')


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Aqui você pode exibir uma mensagem de aviso ou executar outra ação, se desejar.
        return true; // Retorna "true" para desabilitar o comportamento de voltar.
      };

      // Adicione um listener para interceptar o evento de voltar.
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // Remova o listener quando a tela perder o foco.
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );



  useEffect(() => {
    const getUser = async () => {
      let user = await getData("token");
      if (user) navigation?.navigate("Home");
    };
    getUser();
  });

  async function handleLogin() {
    if (emailLogin == "" || passwordLogin == "") {
      setTitle('Login e/ou senha nao devem estar em branco')
      setOpenErrorModal(true) 
    }
    else {
      setLoading(true)
      setDisabledCamps(true)
      var response = await login(emailLogin, passwordLogin, navigation);
      if (!response) {
        setLoading(false)
        setDisabledCamps(false)
      }
    }
  }

  function loginPasswordEye() {
    loginEye == true ? setLoginEye(false) : setLoginEye(true)
  }

  function registerPasswordEye() {
    registerEye == true ? setRegisterEye(false) : setRegisterEye(true)
  }

  async function handleRegister() {
    if (
      emailRegister == "" ||
      usuarioRegister == "" ||
      passwordRegister == "" ||
      passwordRegisterTwo == ""
    ) {
      setTitle('Prencha os campos corretamente !')
      setOpenErrorModal(true)
    } else if (passwordRegister == passwordRegisterTwo) {
      const registroData = {
        login: usuarioRegister,
        nome: usuarioRegister,
        email: emailRegister,
        senha: passwordRegister,
        telefone: null,
      };

      setLoading(true)

      api.usuarioRegister(registroData).then((res) => {
        if (res && res.status === 201) {
          login(usuarioRegister, passwordRegister, navigation);
        } else {
          setDisabledCamps(false)
          setLoading(false)

          setTitle('Algo inesperado aconteceu.')
          setOpenErrorModal(true)
        }
      });
    } else {
      setTitle('As senhas devem ser iguais !')
      setOpenErrorModal(true)
    }
  }

  return (
    <AuthProvider>
      <View style={styles.container}>

        {loading && <Loading />}

        {openErrorModal && <ModalError open={openErrorModal} setOpen={setOpenErrorModal} title={title} />}

        <View style={{ ...styles.card, height: showRegister ? 600 : 500 }}>
          {loading && <Loading />}
          {!showRegister && (
            <>
              <TouchableOpacity
                onPress={() => setRegister(true)}
                style={styles.buttonShowForms}
              >
                <Text style={styles.textShowForm}>Novo? Clique Aqui!</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setRegister(true)}>
                <Text style={styles.title}>Entrar</Text>
              </TouchableOpacity>
              <View style={styles.inputs}>
                <View style={styles.divider}></View>
                <Text style={styles.labels}>Usuario/E-email</Text>
                <TextInput

                  placeholderTextColor={"#9ea1a6"}
                  value={emailLogin}
                  onChangeText={setEmailLogin}
                  style={styles.inputTitle}
                />
              </View>
              <View>
                <Text style={styles.labels}>Senha</Text>

                <TextInput
                  placeholderTextColor={"#9ea1a6"}
                  value={passwordLogin}
                  onChangeText={setPasswordLogin}
                  style={styles.inputTitle}
                  secureTextEntry={loginEye}
                />

                <TouchableOpacity
                  style={{ position: "absolute", right: 20, bottom: 27, elevation: 99 }}
                  activeOpacity={0.7}
                  onPress={() => loginPasswordEye()}
                >

                  {loginEye &&
                    <Ionicons name="eye-off-outline" size={20} color="#f4f4f4" />
                  }

                  {!loginEye &&
                    <Ionicons name="eye-outline" size={20} color="#f4f4f4" />
                  }

                </TouchableOpacity>
              </View>

              <TouchableOpacity
                disabled={disabledCamps}
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
              <TouchableOpacity onPress={() => setRegister(false)}>
                <Text style={{ ...styles.title }}>Registro</Text>
              </TouchableOpacity>
              <View style={styles.inputs}>
                <View style={styles.divider}></View>
                <Text style={styles.labels}>Usuario</Text>
                <TextInput
                  placeholderTextColor={"#9ea1a6"}
                  value={usuarioRegister}
                  onChangeText={setUsuarioRegister}
                  style={styles.inputTitle}
                />
              </View>
              <View>
                <Text style={styles.labels}>E-mail</Text>
                <TextInput
                  placeholderTextColor={"#9ea1a6"}
                  onChangeText={setEmailRegister}
                  value={emailRegister}
                  style={styles.inputTitle}
                />
              </View>

              <View>
                <Text style={styles.labels}>Senha</Text>
                <TextInput
                  placeholderTextColor={"#9ea1a6"}
                  onChangeText={setPasswordRegister}
                  value={passwordRegister}
                  style={styles.inputTitle}
                  secureTextEntry={registerEye}
                />

                <TouchableOpacity
                  style={{ position: "absolute", right: 20, bottom: 27, elevation: 99 }}
                  activeOpacity={0.7}
                  onPress={() => registerPasswordEye()}
                >
                  {registerEye &&
                    <Ionicons name="eye-off-outline" size={20} color="#f4f4f4" />
                  }

                  {!registerEye &&
                    <Ionicons name="eye-outline" size={20} color="#f4f4f4" />
                  }
                </TouchableOpacity>
              </View>

              <View>
                <Text style={styles.labels}>Repita a senha</Text>
                <TextInput
                  placeholderTextColor={"#9ea1a6"}
                  onChangeText={setPasswordRegisterTwo}
                  value={passwordRegisterTwo}
                  style={styles.inputTitle}
                  secureTextEntry={registerEye}
                />
                <TouchableOpacity
                  style={{ position: "absolute", right: 20, bottom: 27, elevation: 99 }}
                  activeOpacity={0.7}
                  onPress={() => registerPasswordEye()}
                >
                  {registerEye &&
                    <Ionicons name="eye-off-outline" size={20} color="#f4f4f4" />
                  }

                  {!registerEye &&
                    <Ionicons name="eye-outline" size={20} color="#f4f4f4" />
                  }
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
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

  buttonShowForms: {
    backgroundColor: "#009ec2",
    width: 160,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    borderRadius: 10,
  },

  textShowForm: {
    fontSize: 20,
    fontWeight: "500",
  },
});
