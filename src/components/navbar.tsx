import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  DrawerLayoutAndroid,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native-elements/dist/image/Image";
import { getData, removeData } from "../utils/asyncStorage";

export default function Navbar({ children, navigation }: any) {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [showInput, setShowInput] = useState(false);
  const [user, setUser] = useState("...");
  const [modalVisible, setModalVisible] = useState(false);

  const getUser = async () => {
    let user = await getData("user");
    setUser(JSON.parse(user).data.login);
  };
  getUser();

  const logout = async () => {
    removeData("user");
    removeData("token");

    navigation.navigate("Login");
  };

  const navigationView = () => (
    <View style={[styles.drawer, styles.navigationContainer]}>
      <TouchableOpacity
        style={[styles.drawerIcon, styles.drawerButtonClose]}
        onPress={() => drawer.current?.closeDrawer()}
      >
        <Ionicons name="close-outline" size={40} color="#c5cedd" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerIcon}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="arrow-undo-outline" size={28} color="#c5cedd" />
        <Text style={styles.letterDrawe}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerIcon}
        onPress={() => navigation.navigate("Note")}
      >
        <Ionicons name="create-outline" size={28} color="#c5cedd" />

        <Text style={styles.letterDrawe}>Notas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.drawerIcon}>
        <Ionicons name="document-text-outline" size={28} color="#c5cedd" />
        <Text style={styles.letterDrawe}>Documentos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.drawerIcon}>
        <Ionicons name="archive-outline" size={28} color="#c5cedd" />
        <Text style={styles.letterDrawe}>Arquivos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.drawerIcon}>
        <Ionicons name="trash-outline" size={28} color="#c5cedd" />
        <Text style={styles.letterDrawe}>Lixeira</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.drawerIcon}>
        <Ionicons name="people-outline" size={28} color="#c5cedd" />
        <Text style={styles.letterDrawe}>Grupo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.profile}
        onPress={() => {setModalVisible(true), drawer.current?.closeDrawer()}}
      >
        <View style={styles.userIcon}>
          <Image
            source={{ uri: "https://picsum.photos/200" }}
            style={styles.icon}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={[styles.fontLetter, styles.name]}>{user}</Text>
          <Text style={[styles.fontLetter, styles.role]}>Desenvolvedor</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={"left"}
      renderNavigationView={navigationView}
    >
      <View style={styles.container}>
        <View style={styles.navbar}>
          {!showInput && (
            <>
              <TouchableOpacity style={styles.icon}>
                <Ionicons
                  name="ios-menu-outline"
                  size={28}
                  color="#c5cedd"
                  onPress={() => drawer.current?.openDrawer()}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon}>
                <Ionicons
                  name="ios-search"
                  size={28}
                  color="#c5cedd"
                  onPress={() => setShowInput(true)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => navigation.navigate("Home")}
              >
                <Ionicons name="ios-home" size={28} color="#c5cedd" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => navigation.navigate("Profile")}
              >
                <Ionicons name="ios-person" size={28} color="#c5cedd" />
              </TouchableOpacity>
            </>
          )}
          {showInput && (
            <>
              <TouchableOpacity style={styles.icon}>
                <Ionicons
                  name="ios-arrow-back-outline"
                  size={28}
                  color="#c5cedd"
                  onPress={() => setShowInput(false)}
                />
              </TouchableOpacity>
              <TextInput
                placeholder="Busque Uma Nota"
                style={styles.NavbarInputSearch}
                numberOfLines={4}
                placeholderTextColor={"#9ea1a6"}
              />
            </>
          )}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          style={styles.modalBody}
          visible={modalVisible}
          //onRequestClose={() => }
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={[
                  {
                    fontSize: 25,
                    color: "#9ea1a6",
                    position: "absolute",
                    top: 25,
                    left: 45,
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
                  <Text style={[styles.TextButtonModal, { color: "#470000" }]}>
                    Desconectar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {children}
      </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  buttonClose: {
    backgroundColor: "#2196F3",
  },

  NavbarInputSearch: {
    borderRadius: 10,
    color: "#9ea1a6",
    fontSize: 25,
    width: `100%`,
    maxWidth: 240,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    top: 170,
    maxWidth: "100%",
    flexDirection: "row",
  },

  button: {
    position: "absolute",
    bottom: 35,
    right: 20,
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#f28c18",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
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
    position: "absolute",
    bottom: 25,
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

  modalText: {
    marginBottom: 15,
    textAlign: "center",
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
    height: "30%",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
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

  root: {
    flex: 1,
  },

  drawer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: `100%`,
    display: "flex",
    gap: 20,
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: "#334155",
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
  },

  profile: {
    width: "100%",
    borderRadius: 30,
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    bottom: 0,
    position: "absolute",
    paddingHorizontal: 10,
  },

  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 10,
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

  drawerButtonClose: {
    position: "absolute",
    top: 50,
    justifyContent: "flex-end",
    width: `100%`,
  },

  drawerIcon: {
    width: "100%",
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },

  letterDrawe: {
    color: "#c5cedd",
    fontSize: 30,
  },

  drawerProfileDivision: {
    width: `100%`,
  },

  hidden: {
    display: "none",
  },
});
