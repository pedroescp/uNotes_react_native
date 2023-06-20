import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import api from "../utils/api";
import Input from "./Input";
import ModalError from "./modalError";

export default function ProfileDocument({ open, setOpen, categoriaID, onClose, login, nome, telefone, cargo, email, id }: any) {


    const [profileLogin, setLogin] = useState(login);
    const [profileEmail, setEmail] = useState(email);
    const [profileTelefone, setTelefone] = useState(telefone);
    const [profileCargo, setCargo] = useState(cargo);
    const [profileNome, setNome] = useState(nome);
    const [profileId, setId] = useState(id);

    const [title, setTitle] = useState('')
    const [openErrorModal, setOpenErrorModal] = useState(false)


    const updateProfile = async () => {
        try {
            if (
                !profileNome ||
                !profileLogin ||
                !profileEmail ||
                !profileTelefone
            ) {
                console.log(
                    profileNome,
                    profileLogin,
                    profileEmail,
                    profileTelefone,
                );

                setTitle('Todos os campos devem estar prenchidos!')
                setOpenErrorModal(true)
            } else {
                try {
                    setOpen(false)
                    
                    const response = await api.usuarioPut({
                        "id": profileId,
                        "login": profileLogin,
                        "nome": profileNome,
                        "email": profileEmail,
                        "telefone": profileTelefone,
                        "cargoId": "5697c024-c2df-4651-b0da-732fe3a93975",
                    });
                    closeModal()
                    onClose()
                } catch (error) {
                    
                }
            }
        } catch (error) {
        }
    };

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
            height: 780,
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
        <View>
            {openErrorModal && <ModalError open={openErrorModal} setOpen={setOpenErrorModal} title={title} />}

            <Modal
                animationType="fade"
                transparent={true}
                style={styles.modalBody}
                visible={open}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width: '100%', marginVertical: 20 }}>
                            <Text style={styles.title}>Editar perfil do usuário.</Text>
                        </View>
                        <View style={{ display: "flex", alignItems: "flex-start", width: "100%", height: '85%' }}>
                            <ScrollView
                                style={{
                                    flex: 1,
                                    width: "100%",
                                    height: '100%',
                                }}
                                showsVerticalScrollIndicator={false}
                            >
                                <Input
                                    register={profileNome}
                                    placeholder={"Nome"}
                                    setRegister={setNome}
                                />

                                <Input
                                    register={profileLogin}
                                    placeholder={"Login"}
                                    setRegister={setLogin}
                                />
                                <Input
                                    register={profileEmail}
                                    placeholder={"Email"}
                                    setRegister={setEmail}
                                />
                                <Input
                                    register={profileTelefone}
                                    placeholder={"Telefone"}
                                    setRegister={setTelefone}
                                />
                                <Input
                                    register={profileCargo}
                                    placeholder={"Cargo"}
                                    setRegister={setCargo}
                                />
                            </ScrollView>

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

                            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => updateProfile()} >
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>SALVAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}