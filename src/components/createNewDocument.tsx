import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import api from "../utils/api";

export default function CreateDocument({ open, setOpen, categoriaID, onClose }: any) {

    const [inputModal, setInputModal] = useState('')

    const createNewDocument = async () => {
        try {            
            const response = await api.postDocumento({
                titulo: inputModal,
                texto: '',
                categoriaId: categoriaID
            })
            closeModal()
            onClose()
        }
        catch (error) {
            console.log(error);
        } finally {
        }
    }

    const styles = StyleSheet.create({
        modalBody: {
            backgroundColor: "#334155",
            elevation: 5,
        },

        title: {
            fontSize: 25,
            fontWeight: "bold",
            color: "#f4f4f4",
        },

        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },

        modalView: {
            margin: 20,
            backgroundColor: "#334255",
            borderRadius: 10,
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
            height: 260,
        },

        labels: {
            color: "#b6c4dd",
            width: "100%",
            textAlign: "left",
            fontWeight: 'bold',
            fontSize: 20,
        },

        inputTitle: {
            width: '100%',
            height: 60,
            padding: 0,
            marginTop: 10,
            paddingHorizontal: 10,
            marginBottom: 10,
            fontSize: 30,
            fontWeight: "500",
            color: "#b6c4dd",
            borderColor: "#b6c4dd",
            borderWidth: 0.3,
            borderRadius: 12,
            backgroundColor: '#2a303c'
        },

        button: {
            borderRadius: 10,
            backgroundColor: "#f28c18",
            alignItems: "center",
            justifyContent: "center",
            elevation: 5,
            fontSize: 40,
            fontWeight: "900",
            margin: 10,
            width: 100,
            height: 60,
        },
    })

    function closeModal() {
        setOpen(false)
        categoriaID = ''
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            style={styles.modalBody}
            visible={open}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ width: '100%', marginVertical: 20 }}>
                        <Text style={styles.title}>Adicionar novo documento.</Text>
                    </View>
                    <View style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
                        <Text style={styles.labels}>Titulo</Text>
                        <TextInput
                            value={inputModal}
                            onChangeText={setInputModal}
                            placeholderTextColor={"#9ea1a6"}
                            placeholder="Type here"
                            style={styles.inputTitle}
                        />
                    </View>

                    <View style={{ display: "flex", alignItems: "flex-start", width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity style={{
                            alignItems: "center",
                            justifyContent: "center",
                            margin: 10,

                            width: 100,
                            height: 60,
                        }}
                            onPress={() => closeModal()}
                            activeOpacity={0.7}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: '#f4f4f4' }}>CANCELAR</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => createNewDocument()} >
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>SALVAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>


    )




}