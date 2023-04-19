import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Input({ placeholder, register, setRegister }: any) {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{placeholder}</Text>
      <TextInput
        placeholder={placeholder}
        value={register}
        placeholderTextColor={"#9ea1a6"}
        style={styles.input}
        onChangeText={setRegister}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "gray",
    width: "100%",
    height: 70,
    padding: 10,
    borderRadius: 10,
    fontSize: 30,
    fontWeight: "500",
    color: "#b6c4dd",
  },

  text: {
    fontSize: 25,
    marginBottom: 10,
    color: "#f6f7f8",
  },
});
