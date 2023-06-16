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
import ModalCategorias from "./modal";
import { removeData } from "../utils/asyncStorage";

export default function Document({ navigation }: any) {
    interface Note {
        id: number;
        titulo: string;
        texto: string;
    }

    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState<Note[]>([]);
    const [showEmpty, setShowEmpty] = useState(false);

    useEffect(() => {
        getCategorias();
    }, [loading]);

    const getCategorias = async () => {
        try {
            setShowEmpty(false)
            setCategorias([]);
            const response = await api.getAllCategorias();
            setCategorias(response.data);
            if (!response.data || response.data.length <= 0) setShowEmpty(true);

        } catch (error: any) {
            console.error(error);
            if (error.response.status == 401) logout()
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        removeData("user");
        removeData("token");

        navigation.navigate("Login");
    };

    return (
        <Navbar navigation={navigation}>

            {loading && <Loading />}
            {showEmpty && <Empty />}
            <View style={{ marginTop: 140, width: '95%' }}>
                <TouchableOpacity style={{
                    borderRadius: 12,
                    backgroundColor: "#2a303c",
                    shadowColor: "#000",
                }}>
                    <View style={styles.header}>
                        <Text style={styles.title}><Ionicons name="ios-add" size={30} color="#f4f4f4" /> NOVA CATEGORIA</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.div}>
                {!loading && (
                    <FlatList
                        contentContainerStyle={styles.listContent}
                        data={categorias}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={1}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.card}
                            >
                                <View style={styles.header}>
                                    <Text style={styles.title}>{item.titulo}</Text>
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
        marginTop: 50,
        width: '90%',
    },

    listContent: {
        width: '100%',
    },

    card: {
        marginBottom: 10,
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: 12,
        backgroundColor: "#2a303c",
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
        fontSize: 25,
        fontWeight: "bold",
        color: "#f4f4f4",
    },
    body: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
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
