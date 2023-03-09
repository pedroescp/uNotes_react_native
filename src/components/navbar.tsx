import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  DrawerLayoutAndroid,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NoteCharge from "./note";

export default function Navbar() {
  const onPress = () => {
    console.log("Botão de adicionar pressionado");
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <DrawerLayoutAndroid
      drawerWidth={250}
      drawerPosition="left"
      renderNavigationView={() => (
        <View style={styles.drawerContent}>
          <Text>Conteúdo do Drawer aqui</Text>
        </View>
      )}
    >
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          style={styles.modalBody}
          visible={modalVisible}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                placeholder={"Titulo da nota"}
                placeholderTextColor={"#9ea1a6"}
                style={styles.inputTitle}
              />

              <TextInput
                placeholder={"Escreva uma nota"}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor={"#9ea1a6"}
                style={styles.inputBody}
              />
              <View style={styles.viewBar}>
                <TouchableOpacity>
                  <Ionicons name="ios-trash" size={28} color="#8e8e8e" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="ios-archive" size={28} color="#8e8e8e" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.navbar}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="ios-menu-outline" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="ios-search" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="ios-home" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="ios-person" size={28} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="ios-add" size={40} color="#303030" />
        </TouchableOpacity>
        <View style={styles.content}>
          <NoteCharge/>
          <NoteCharge/>
          <NoteCharge/>
        </View>
      </View>
    </DrawerLayoutAndroid>
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
    flex: 1,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    size: 3
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

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  modalView: {
    margin: 20,
    backgroundColor: "#334255",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1.25,
    shadowRadius: 20,
    elevation: 90,
    width: "100%",
    height: "100%",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalBody: {
    backgroundColor: "#334155",
    elevation: 5,
  },
});
