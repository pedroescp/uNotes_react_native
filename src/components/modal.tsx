import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import {
  BackHandler,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import api from "../utils/api";

//type 1 = note | 2 = arquivo | 3 lixeira

export default function ModalNotes({ open, setOpen, type, cargeNotes }: any) {
  const [bodyNote, setbodyNote] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  useEffect(() => {});

  const closeNotes = async () => {
    if (title || bodyNote) {
      try {
        const response = await api.notesPost({
          titulo: title,
          texto: bodyNote,
          criadorId: null,
          usuarioAtualizacaoId: null,
          documentoId: null,
        });
        cargeNotes(true)
        setModalVisible(!modalVisible);
      } catch (error) {
        console.log(error);
      }
    }

    setOpen(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      style={styles.modalBody}
      visible={open}
      onRequestClose={async () => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={{ marginTop: 110 }}
            onPress={() => closeNotes()}
          >
            <Ionicons name="arrow-back" size={40} color="#c5cedd" />
          </TouchableOpacity>

          <TextInput
            placeholder={"Titulo"}
            placeholderTextColor={"#9ea1a6"}
            value={title}
            autoFocus={true}
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

          {type != 1 && (
            <View style={styles.viewBar}>
              {type == 2 && (
                <TouchableOpacity>
                  <Ionicons name="ios-trash" size={28} color="#8e8e8e" />
                </TouchableOpacity>
              )}
              {type == 3 && (
                <TouchableOpacity>
                  <Ionicons name="ios-archive" size={28} color="#8e8e8e" />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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

  modalView: {
    margin: 0,
    backgroundColor: "#334255",
    borderRadius: 20,
    padding: 20,
    display: "flex",
    alignItems: "flex-start",
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
    marginTop: 0,
  },
  modalBody: {
    backgroundColor: "#334155",
    elevation: 5,
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
});
