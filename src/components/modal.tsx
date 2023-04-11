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

//type 1 = note | 2 = arquivo | 3 lixeira | 4 Open note

export default function ModalNotes({
  open,
  setOpen,
  type,
  cargeNotes,
  id,
  titulo,
  body,
}: any) {
  const [bodyNote, setbodyNote] = useState(body);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState(titulo);
  useEffect(() => {});
  const closeNotes = async () => {
    if (title || (bodyNote && type != 3) || type != 2) {
      if (id == null) {
        try {
          const response = await api.notesPost({
            titulo: title,
            texto: bodyNote,
            criadorId: null,
            usuarioAtualizacaoId: null,
            documentoId: null,
          });
          cargeNotes(true);
          setModalVisible(false);
        } catch (error) {
          console.log(error);
        } finally {
          closeResetModal();
        }
      } else {
        const response = await api.notesUpdate({
          id: id,
          titulo: title,
          texto: bodyNote,
        });
        closeResetModal();
      }
    } else {
      closeResetModal();
    }
  };

  const PostTrash = async () => {
    console.log(id);
    try {
      const response = await api.trashDelete(id);
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    } finally {
      closeResetModal();
    }
  };

  const PostArchive = async () => {
    try {
      const response = await api.archivesDelete(id);
      cargeNotes(true);
      setModalVisible(!modalVisible);
    } catch (error) {
      console.log(error);
    } finally {
      closeResetModal();
    }
  };

  const closeResetModal = async () => {
    setOpen(false);
    cargeNotes(true);
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
          <View
            style={{ display: "flex", alignItems: "flex-start", width: "100%" }}
          >
            <TouchableOpacity
              style={{ marginTop: 110 }}
              onPress={() => closeNotes()}
            >
              <Ionicons name="arrow-back" size={40} color="#c5cedd" />
            </TouchableOpacity>
          </View>

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
              {type != 3 && type != 2 && (
                <>
                  <TouchableOpacity>
                    <Ionicons
                      name="ios-trash"
                      size={28}
                      color="#8e8e8e"
                      onPress={() => PostTrash()}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Ionicons
                      name="ios-archive"
                      size={28}
                      color="#8e8e8e"
                      onPress={() => PostArchive()}
                    />
                  </TouchableOpacity>
                </>
              )}
              {type == 3 && (
                <TouchableOpacity>
                  <Ionicons
                    name="arrow-undo-outline"
                    size={28}
                    color="#8e8e8e"
                    onPress={() => PostArchive()}
                  />
                </TouchableOpacity>
              )}

              {type == 2 && (
                <TouchableOpacity>
                  <Ionicons
                    name="arrow-undo-outline"
                    size={28}
                    color="#8e8e8e"
                    onPress={() => PostTrash()}
                  />
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
    marginTop: 0,
  },
  modalBody: {
    backgroundColor: "#334155",
    elevation: 5,
  },

  viewBar: {
    backgroundColor: "#f3f3f3",
    position: "absolute",
    bottom: 0,
    height: 50,
    borderRadius: 10,
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
