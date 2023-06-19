import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CharacterLimitedText = ({ text, limit }: any) => {
    if (text.length <= limit) {
        // Se o texto tiver menos ou igual ao limite, exiba-o completo
        return <Text style={styles.title}>{text}</Text>;
    } else {
        // Se o texto for maior que o limite, exiba apenas os primeiros caracteres
        const trimmedText = text.substring(0, limit) + '...';
        return <Text style={styles.title}>{trimmedText}</Text>;
    }
};

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#f4f4f4",
    },
})

export default CharacterLimitedText;
