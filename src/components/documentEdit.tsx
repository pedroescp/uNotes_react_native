import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    StyleSheet, Text, View,
} from "react-native";
import api from "../utils/api";
import Navbar from "./navbar";
import { removeData } from "../utils/asyncStorage";
import { useRoute } from "@react-navigation/native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

export default function DocumentEdit({ navigation }: any) {

    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [documento, setDocumento] = useState()
    const [textDocument, setTextDocument] = useState('')
    const [showEmpty, setShowEmpty] = useState(false);

    const route = useRoute();
    const { documentID }: any = route.params;

    useEffect(() => {
        getDocument();
    }, [loading]);

    const logout = async () => {
        removeData("user");
        removeData("token");
        navigation.navigate("Login");
    };

    const getDocument = async () => {
        try {
            setShowEmpty(false)
            setCategorias([]);
            const documento = await api.getDocumento(documentID)
            setDocumento(documento.data)
            setTextDocument(documento.data.texto)


        } catch (error: any) {
            console.error(error);
            if (error.response.status == 401) logout()
        } finally {
            setLoading(false);
        }
    };

    return (
        <Navbar navigation={navigation}>
            <TextInput
                placeholder={"Escreva um documento"}
                multiline={true}
                numberOfLines={4}
                value={textDocument}
                onChangeText={setTextDocument}
                placeholderTextColor={"#9ea1a6"}
                style={styles.inputBody}
            />


            <View style={styles.buttonsActions}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", flex: 1 }}>

                    <TouchableOpacity><Text style={styles.title}>H1</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.title}>H2</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.title}>H3</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.title}>B</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.title}>I</Text></TouchableOpacity>

                </View>
            </View>
        </Navbar>
    );
}

const styles = StyleSheet.create({

    title: {
        width: 40,
        textAlign: "center",
        fontWeight: "bold",
        padding: 8,
        color: '#c5cedd',
        fontSize: 20,
        backgroundColor: '#505050',
        borderRadius: 100,
    },

    heading1: {
        fontSize: 24,
        color: 'purple',
    },
    link: {
        color: 'pink',
    },
    mailTo: {
        color: 'orange',
    },
    text: {
        color: '#555555',
    },

    buttonsActions: {
        position: "absolute",
        backgroundColor: '#262b36',
        borderRadius: 50,
        padding: 10,
        width: '100%',
        bottom: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 1.25,
        shadowRadius: 20,
    },

    inputBody: {
        textAlignVertical: "top",
        width: "100%",
        height: "70%",
        marginTop: 20,
        marginBottom: 10,
        fontSize: 30,
        justifyContent: "center",
        fontWeight: "900",
        color: "#f6f7f8",
    },
});
