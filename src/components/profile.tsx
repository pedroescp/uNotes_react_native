import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Keyboard,
  ScrollView,
  Animated,
  TextInput,
} from "react-native";
import api from "../utils/api";
import Navbar from "./navbar";
import Loading from "./Loading";
import { Image } from "react-native-elements";
import Input from "./Input";
import ProfileDocument from "./ProfileModal";

export default function NoteCharge({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);
  const [showEmpty, setShowEmpty] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [buttonOpacity, setButtonOpacity] = useState(new Animated.Value(1));

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cargo, setCargo] = useState("");
  const [nome, setNome] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    getprofile();
  }, [loading]);



  const getprofile = async () => {
    try {
      resetPage();
      const response = await api.usuarioByIdGet();
      setProfile(response.data);
      if (!response.data || response.data.length <= 0) setShowEmpty(true);
      setLogin(response.data.login);
      setId(response.data.id);
      setEmail(response.data.email);
      setNome(response.data.nome);
      setTelefone(response.data.telefone);
      setCargo(response.data.cargoId)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetPage = async () => {
    setShowEmpty(false);
    setProfile([]);
  };
  return (
    <Navbar navigation={navigation}>
      {loading && <Loading />}

      <ProfileDocument
        open={modalVisible}
        setOpen={setModalVisible}
        onClose={getprofile}

        login={login} 
        nome={nome}
        telefone={telefone}
        cargo={cargo}
        email={email}
        id={id}
        />

      <View style={styles.div}>
        {!loading && (
          <>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../icons/profile.jpg")}
                style={styles.icon}
              />
            </View>

            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <Text style={{ fontSize: 30, color: "#f6f7f8" }}>{nome}</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Ionicons
                    name="ios-pencil-outline"
                    size={25}
                    color="#c5cedd"
                  />
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 20, color: "#f6f7f8" }}>
                Desenvolvedor
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 100,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <Text style={{ fontSize: 30, color: "#f6f7f8" }}>
                  Categorias
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
    </Navbar>
  );
}

const styles = StyleSheet.create({
  div: {
    flex: 1,
    marginTop: 140,
  },

  card: {
    position: "relative",
    flexBasis: "42%",
    margin: 10,
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#303030",
  },
  body: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },

  button: {
    height: 70,
    borderRadius: 10,
    backgroundColor: "#f28c18",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    zIndex: 999,
  },

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
  navbar: {
    position: "absolute",
    top: 70,
    left: 40,
    right: 40,
    height: 60,
    backgroundColor: "#262b36",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 50,
  },
  icon: {
    width: 150,
    height: 150,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
  },
  content: {
    flexDirection: "row",
    fontSize: 15,
    fontWeight: "400",
  },

  drawerContent: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },

  inputTitle: {
    width: "100%",
    height: 44,
    padding: 0,
    marginTop: 5,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "500",
    color: "#b6c4dd",
  },

  inputBody: {
    textAlignVertical: "top",
    width: "100%",
    height: "100%",
    marginTop: 20,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "900",
    color: "#f6f7f8",
  },

  viewBar: {
    backgroundColor: "#f3f3f3",
    position: "absolute",
    bottom: 10,
    padding: 0,
    borderRadius: 10,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 50,
    width: "100%",
  },

  modalView: {
    alignItems: "flex-start",
    backgroundColor: "#334255",
    padding: 20,
    width: "100%",
    height: "100%",
  },

  centeredView: {
    alignItems: "center",
  },

  view: {
    width: "100%",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "gray",
    width: "100%",
    height: 70,
    padding: 10,
    borderRadius: 10,
    fontSize: 30,
    fontWeight: "500",
    color: "#b6c4dd",
  },

  text: {
    fontSize: 25,
    marginBottom: 10,
    color: "#f6f7f8",
  },
});
