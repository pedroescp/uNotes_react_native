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
import ModalNotes from "./modal";

export default function NoteCharge({ navigation }: any) {
  interface Note {
    id: number;
    titulo: string;
    texto: string;
  }

  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [showEmpty, setShowEmpty] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setmodalType] = useState(1);
  const [notesId, setNotesId] = useState(null);
  const [body, setBody] = useState(null);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    getNotes();
  }, [loading]);

  const getNotes = async () => {
    try {
      setShowEmpty(false)
      setNotes([]);
      const response = await api.notesGet();
      setNotes(response.data);
      if (!response.data || response.data.length <= 0) setShowEmpty(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = async (id: any, type: any, title: any, body: any) => {
    setNotesId(id);
    setmodalType(type);
    setTitle(title);
    setBody(body);
    setModalVisible(true);
  };

  return (
    <Navbar navigation={navigation}>
      {modalVisible && (
        <ModalNotes
          open={modalVisible}
          setOpen={setModalVisible}
          type={modalType}
          cargeNotes={setLoading}
          id={notesId}
          titulo={title}
          body={body}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => openModal(null, 1, null, null)}
        activeOpacity={0.7}
      >
        <Ionicons name="ios-add" size={40} color="#303030" />
      </TouchableOpacity>
      {loading && <Loading />}
      {showEmpty && <Empty />}
      <View style={styles.div}>
        {!loading && (
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => openModal(item.id, 4, item.titulo, item.texto)}
              >
                <View style={styles.header}>
                  <Text style={styles.title}>{item.titulo}</Text>
                </View>
                <View style={styles.body}>
                  <Text style={styles.content}>{item.texto}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
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
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
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
