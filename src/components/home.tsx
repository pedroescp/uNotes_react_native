import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Modal,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getData, removeData } from "../utils/asyncStorage";
import api from "../utils/api";

export default function Home({ navigation }: any) {
  const [user, setUser] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getUser();
  }, [user]);

  const getUser = async () => {
    try {
      const response = await api.usuarioByIdGet();
      setUser(response.data['nome']);

    } catch (error: any) {
      console.error(error);
      if (error.response.status == 401) logout()
    }

    let user = await getData("user");
    if (!user) {
      navigation.navigate("Login");
    } else {
      setUser(JSON.parse(user).data.login);
    }

  };

  const logout = async () => {
    removeData("user");
    removeData("token");

    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.push("Notes", {
            itemId: 86,
          })
        }
      >
        <Text style={styles.buttonText}>Notas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() =>
          navigation.push("Document", {
            itemId: 86,
          })
        }
      >
        <Text style={styles.buttonText}>Documentação</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navbar}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.userIcon}>
          <Image
            source={require('../icons/profile.jpg')}
            style={styles.icon}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={[styles.fontLetter, styles.name]}>{user}</Text>
          <Text style={[styles.fontLetter, styles.role]}>Desenvolvedor</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        style={styles.modalBody}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={[
                {
                  fontSize: 25,
                  color: "#9ea1a6",
                  position: "absolute",
                  top: `15%`,
                  left: `5%`,
                  fontWeight: "bold",
                },
              ]}
            >
              Desconectar?
            </Text>
            <Text style={[{ fontSize: 25, color: "#9ea1a6" }]}>
              Voce tem certeza que deseja descontectar sua conta?
            </Text>
            <View style={styles.viewBar}>
              <TouchableOpacity
                style={[
                  styles.Button,
                  {
                    borderRadius: 10,
                    borderWidth: 2,
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                  },
                ]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.TextButtonModal, { color: "#a6adbb" }]}>
                  Fechar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.Button, { backgroundColor: "#f87272" }]}
                onPress={() => logout()}
              >
                <Text style={[styles.TextButtonModal, { color: "#470000", fontSize: 19 }]}>
                  Desconectar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "flex-start",
    color: "#f28c18",
    position: "absolute",
    bottom: 0,
    right: 0,
    top: 30,
    left: 0,
    padding: 10,
  },
  fontOrange: {
    color: "#f28c18",
  },
  button: {
    width: "100%",
    height: "42%",
    marginVertical: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#f28c18",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  buttonText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#f28c18",
  },
  navbar: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "#212630",
    width: "100%",
    borderRadius: 30,
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 10,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  userInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  role: {
    fontSize: 14,
  },
  fontLetter: {
    color: "#c5cedd",
  },

  modalBody: {
    backgroundColor: "#0000",
    shadowColor: "#00000",
    shadowOffset: { width: 100, height: 100 },
    shadowOpacity: 0,
    shadowRadius: 1,
    elevation: 100,
    borderWidth: 1,
    borderColor: "#000",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

  modalView: {
    margin: 20,
    backgroundColor: "#334255",
    borderRadius: 20,
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1.25,
    shadowRadius: 20,
    elevation: 90,
    width: "90%",
    height: "35%",
  },

  viewBar: {
    position: "absolute",
    bottom: 15,
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

  Button: {
    backgroundColor: "red",
    width: 130,
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  TextButtonModal: {
    fontSize: 20,
    fontWeight: "500",
  },
});
