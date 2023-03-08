import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  DrawerLayoutAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Navbar() {
  const onPress = () => {
    console.log("Botão de adicionar pressionado");
  };

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
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Ionicons name="ios-add" size={40} color="#303030" />
        </TouchableOpacity>
        <View style={styles.content}>{/* conteúdo principal aqui */}</View>
      </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 60,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
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
});
