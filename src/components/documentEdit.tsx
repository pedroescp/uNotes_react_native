import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import api from "../utils/api";
import Navbar from "./navbar";
import { removeData } from "../utils/asyncStorage";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Loading from "./Loading";
import Markdown from 'react-native-simple-markdown'
import CharacterLimitedText from "./CharacterLimitedText";


export default function DocumentEdit({ navigation }: any) {

    console.log(navigation);
    

    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [documento, setDocumento] = useState()
    const [textDocument, setTextDocument] = useState('')
    const [showEmpty, setShowEmpty] = useState(false);
    const [tituloDocument, setTituloDocument] = useState('')

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
            setTituloDocument(documento.data.titulo)


        } catch (error: any) {
            console.error(error);
            if (error.response.status == 401) logout()
        } finally {
            setLoading(false);
        }
    };

    function redirectDocument() {
        navigation.navigate('Document')
        alert('asdasd')
    }

    return (
        <Navbar navigation={navigation}>

            {loading && <Loading />}

            <View style={{
                width: "100%",
                height: "85%",
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                bottom: 20,
                position: "absolute",
                paddingHorizontal: 16,
            }}>

                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: '100%' }}>
                    <View>
                        <TouchableOpacity
                        onPress={() => navigation.navigate('Document')}
                        >
                            <Ionicons name="arrow-back" size={40} color="#c5cedd" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '80%', alignItems: "center" }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
                            <CharacterLimitedText text={tituloDocument} limit={33} />
                        </Text>
                    </View>
                </View>

                <ScrollView style={{ width: '100%', backgroundColor: '#ffff', borderRadius: 10, padding: 10, }}>
                    <Markdown styles={markdownStyles}>
                        {textDocument}
                    </Markdown>
                </ScrollView>
            </View>

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

const markdownStyles = {
    link: {
        color: 'pink',
        marginTop: 10,
        marginBottom: 10,
    },
    mailTo: {
        color: 'blue',
        marginTop: 3,
        marginBottom: 3,
    },
    text: {
        color: 'black',
        marginTop: 5,
        marginBottom: 5,
    },
    heading1: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    heading2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    heading3: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 8,
    },
    strong: {
        fontWeight: 'bold',
        marginTop: 3,
        marginBottom: 3,
    },
    em: {
        fontStyle: 'italic',
        marginTop: 3,
        marginBottom: 3,
    },
    codeBlock: {
        backgroundColor: 'lightgray',
        padding: 5,
        marginTop: 3,
        marginBottom: 3,
    },
    blockQuote: {
        backgroundColor: 'lightgreen',
        padding: 5,
        marginTop: 3,
        marginBottom: 3,
    },
    listItem: {
        marginTop: 3,
        marginBottom: 3,
    },
};

const styles = StyleSheet.create({

    documentTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',

    },

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
        display: "none",
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
