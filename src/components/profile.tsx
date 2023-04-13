import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import api from "../utils/api";
import Navbar from "./navbar";
import Loading from "./Loading";
import Empty from "./Empty";
import Modalprofile from "./modal";
import { Image } from "react-native-elements";

export default function NoteCharge({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);
  const [showEmpty, setShowEmpty] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setmodalType] = useState(1);
  const [profileId, setProfileId] = useState(null);
  const [body, setBody] = useState(null);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    getprofile();
  }, [loading]);

  const getprofile = async () => {
    try {
      setShowEmpty(false);
      setProfile([]);
      const response = await api.usuarioByIdGet();
      setProfile(response.data);
      if (!response.data || response.data.length <= 0) setShowEmpty(true);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = async (id: any, type: any, title: any, body: any) => {
    setProfileId(id);
    setmodalType(type);
    setTitle(title);
    setBody(body);
    setModalVisible(true);
  };

  return (
    <Navbar navigation={navigation}>
      {loading && <Loading />}
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
              source={require('../icons/profile.jpg')}
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
                <Text style={{ fontSize: 80, color: "#f6f7f8" }}>
                  {profile.nome}
                </Text>
                <TouchableOpacity>
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
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <Text style={{ fontSize: 30, color: "#f6f7f8" }}>
                  Categorias
                </Text>
                <TouchableOpacity>
                  <Ionicons name="ios-add-circle" size={25} color="#c5cedd" />
                </TouchableOpacity>
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

  QuillEditor: {
    width: 500,
    padding: 0,
    maxWidth: `100%`,
    backgroundColor: "#262b36",
  },

  QuillToolbar: {
    position: "absolute",
    flex: 1,
  },

  root: {
    flex: 1,
  },
});
