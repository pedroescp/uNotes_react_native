import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import api from "../utils/api";
import Navbar from "./navbar";
import Loading from "./Loading";
import Empty from "./Empty";

export default function Archived({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [showEmpty, setShowEmpty] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [bodyNote, setbodyNote] = useState("");
  const [title, setTitle] = useState("");
  const _editor = React.createRef();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      setNotes([]);
      const response = await api.arhivesGet();
      setNotes(response.data);
      if (!response.data || response.data.length <= 0) setShowEmpty(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Navbar navigation={navigation}>
      <Modal
        animationType="slide"
        transparent={true}
        style={styles.modalBody}
        visible={modalVisible}
        onRequestClose={async () => {
          if (title || bodyNote) {
            try {
              const response = await api.notesPost({
                titulo: title,
                texto: bodyNote,
                criadorId: null,
                usuarioAtualizacaoId: null,
                documentoId: null,
              });
              navigation.navigate("Notes")
              setModalVisible(!modalVisible);
            } catch (error) {
              console.log(error);
            }
          }
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder={"Titulo"}
              placeholderTextColor={"#9ea1a6"}
              value={title}
              onChangeText={setTitle}
              style={styles.inputTitle}
            />

            <TextInput
              placeholder={"Escreva uma nota"}
              multiline={true}
              numberOfLines={4}
              value={bodyNote}
              onChangeText={setbodyNote}
              placeholderTextColor={"#9ea1a6"}
              style={styles.inputBody}
            />
            {/*             <SafeAreaView style={styles.root}>
              <StatusBar style="auto" />
              <QuillEditor
                autoSize
                style={styles.QuillEditor}
                ref={_editor}
                initialHtml="<h1>Quill Editor for react-native</h1>"
              />
              <QuillToolbar
                editor={_editor}
                style={styles.QuillToolbar}
                options="full"
                theme="light"
              />
            </SafeAreaView> */}
            {
              <View style={styles.viewBar}>
                <TouchableOpacity>
                  <Ionicons name="ios-trash" size={28} color="#8e8e8e" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="ios-archive" size={28} color="#8e8e8e" />
                </TouchableOpacity>
              </View>
            }
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Ionicons name="ios-add" size={40} color="#303030" />
      </TouchableOpacity>
      {loading && <Loading />}
      {showEmpty && <Empty />}
      <View style={styles.div}>
        {!loading &&
          notes.map((note: any) => (
            <View style={styles.card} key={note.id} id={note.id}>
              <View style={styles.header}>
                <Text style={styles.title}>{note.titulo}</Text>
              </View>
              <View style={styles.body}>
                <Text style={styles.content}>{note.texto}</Text>
              </View>
            </View>
          ))}
      </View>
    </Navbar>
  );
}

const styles = StyleSheet.create({
  div: {
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
  },

  card: {
    position: "relative",
    display: "flex",
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
    elevation: 4,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
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
    padding: 16,
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
    top: 170,
    maxWidth: "100%",
    flexDirection: "row",
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