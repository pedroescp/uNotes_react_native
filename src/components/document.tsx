import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Modal,
    Animated, Easing
} from "react-native";
import api from "../utils/api";
import Navbar from "./navbar";
import Loading from "./Loading";
import Empty from "./Empty";
import { removeData } from "../utils/asyncStorage";
import { TextInput } from "react-native-gesture-handler";
import CharacterLimitedText from "./CharacterLimitedText";
import CreateDocument from "./createNewDocument";
import DeleteCategoria from "./deleteCategoria";
import EditCategoria from "./editCategoria";

export default function Document({ navigation }: any) {
    interface Categoria {
        id: number;
        titulo: string;
        texto: string;
    }

    interface Document {
        categoriaId: number;
        id: string;
        notas: string;
        texto: string;
        titulo: string;
    }

    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [documentos, setDocumentos] = useState<Document[]>([])
    const [showEmpty, setShowEmpty] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [newCategoryTitle, setNewCategoryTitle] = useState('')
    const [expandedItems, setExpandedItems] = useState<number[]>([]);

    const [openPlusModal, setOpenPlusModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setDeleteModal] = useState(false)

    const [categoriaId, setcategoriaId] = useState()
    const [categoriaTitle, setCategoriaTitle] = useState('')

    useEffect(() => {
        getCategorias();

    }, [loading]);

    const logout = async () => {
        removeData("user");
        removeData("token");
        navigation.navigate("Login");
    };

    const getCategorias = async () => {
        try {
            setShowEmpty(false)
            setCategorias([]);
            const categoria = await api.getAllCategorias();
            const documento = await api.getAllDocumentos()

            if (!categoria.data || categoria.data.length <= 0) setShowEmpty(true);



            setDocumentos(documento.data)
            setCategorias(categoria.data);


        } catch (error: any) {
            console.error(error);
            if (error.response.status == 401) logout()
        } finally {
            setLoading(false);
        }
    };

    const createNewCategory = async () => {
        try {
            const response = await api.postCategorias({
                id: null,
                Titulo: newCategoryTitle,
                CategoriaPai: null
            })
            setLoading(true);
            setNewCategoryTitle('')
            setOpenModal(false)
            getCategorias()
        }
        catch (error) {
            console.log(error);
        } finally {
        }
    }

    function plusModal(id: any) {
        setOpenPlusModal(true)
        setcategoriaId(id)
    }

    function deleteModal(id: any) {
        setDeleteModal(true)
        setcategoriaId(id)
    }

    function editModal(id: any, title: any) {
        setOpenEditModal(true)
        setcategoriaId(id)
        setCategoriaTitle(title)
    }

    const renderItem = ({ item }: any) => {
        const filteredDocuments = documentos.filter((doc) => doc.categoriaId === item.id);

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => {
                    if (expandedItems.includes(item.id)) {
                        setExpandedItems(expandedItems.filter((id) => id !== item.id));
                    } else {
                        setExpandedItems([...expandedItems, item.id]);
                    }
                }}
            >
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <View style={{ flexDirection: 'row', gap: 10 }}>

                            <CharacterLimitedText text={item.titulo} limit={10} />

                            {expandedItems.includes(item.id) ? (
                                <View style={{ flexDirection: 'row', gap: 10 }}>

                                    <TouchableOpacity onPress={() => plusModal(item.id)}>
                                        <Ionicons name="add-outline" size={20} color="#f4f4f4" />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => editModal(item.id, item.titulo)}>
                                        <Ionicons name="create-outline" size={20} color="#f4f4f4" />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => deleteModal(item.id)}>
                                        <Ionicons name="trash-outline" size={20} color="#f4f4f4" />
                                    </TouchableOpacity>

                                </View>
                            ) : ('')}
                        </View>
                        {expandedItems.includes(item.id) ? (
                            <Ionicons name="chevron-up-outline" size={20} color="#f4f4f4" />
                        ) : (
                            <Ionicons name="chevron-down-outline" size={20} color="#f4f4f4" />
                        )}
                    </View>
                </View>
                {expandedItems.includes(item.id) && (
                    <View style={{ marginTop: 10, padding: 15 }}>
                        {filteredDocuments == "" && <Text style={styles.documentText}>Nenhum documento aparente</Text>}
                        {filteredDocuments.map((doc) => (
                            <TouchableOpacity
                                style={styles.documentCard}
                                key={doc.id}
                                onPress={() => navigation.navigate('DocumentEdit', { documentID: doc.id })}
                            >
                                <View>
                                    <Text style={styles.documentTitle}>{doc.titulo}</Text>
                                </View>
                                <View>
                                    <Text numberOfLines={1} style={styles.documentText}>{doc.texto}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <Navbar navigation={navigation}>

            <Modal
                animationType="fade"
                transparent={true}
                style={styles.modalBody}
                visible={openModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width: '100%', marginVertical: 20 }}>
                            <Text style={styles.title}>Cadastro de Categoria.</Text>
                        </View>
                        <View style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
                            <Text style={styles.labels}>Nome</Text>
                            <TextInput
                                value={newCategoryTitle}
                                onChangeText={setNewCategoryTitle}
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
                                onPress={() => setOpenModal(false)}
                                activeOpacity={0.7}>
                                <Text style={{ fontSize: 20, fontWeight: "bold", color: '#f4f4f4' }}>CANCELAR</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => createNewCategory()}>
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>SALVAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>

            <CreateDocument open={openPlusModal} setOpen={setOpenPlusModal} categoriaID={categoriaId} onClose={getCategorias} />
            <DeleteCategoria open={openDeleteModal} setOpen={setDeleteModal} categoriaID={categoriaId} onClose={getCategorias} />
            <EditCategoria open={openEditModal} setOpen={setOpenEditModal} categoriaID={categoriaId} onClose={getCategorias} title={categoriaTitle} />

            {loading && <Loading />}
            {showEmpty && <Empty />}
            <View style={{ marginTop: 140, width: '95%' }}>
                <TouchableOpacity style={{
                    borderRadius: 12,
                    backgroundColor: "#212630",
                    shadowColor: "#000",
                }}
                    onPress={() => setOpenModal(true)}
                >
                    <View style={{ display: "flex", alignItems: "center", padding: 15 }}>
                        <Text style={styles.title}><Ionicons name="ios-add" size={30} color="#3398c6" /> NOVA CATEGORIA
                        </Text>
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
                        renderItem={renderItem}
                    />

                )}
            </View>
        </Navbar>
    );
}

const styles = StyleSheet.create({

    documentCard: {
        width: '100%',
        backgroundColor: '#555a63',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },

    documentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    documentText: {
        fontSize: 14,
        fontStyle: "italic",
        color: '#fff',
    },

    div: {
        flex: 1,
        marginTop: 50,
        width: '90%',
    },

    listContent: {
        width: '100%',
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
        padding: 15,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#f4f4f4",
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

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
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

    labels: {
        color: "#b6c4dd",
        width: "100%",
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 20,
    },
});
