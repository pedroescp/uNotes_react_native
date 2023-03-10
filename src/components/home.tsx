import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import Navbar from "./navbar";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
        
      <TouchableOpacity style={styles.button} onPress={() => navigation.push('Navbar', {
            itemId: 86,
            otherParam: 'Digite um titulo',
          })}>
        <Text style={styles.buttonText}>Notas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Documentacao</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navbar}>
        <View style={styles.userIcon}>
          <Image
            source={{ uri: "https://picsum.photos/200" }}
            style={styles.icon}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={[styles.fontLetter, styles.name]}>Pedro</Text>
          <Text style={[styles.fontLetter, styles.role]}>Desenvolvedor</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
    color: "#f28c18",
    padding: 10,
  },
  fontOrange: {
    color: "#f28c18",
  },
  button: {
    width: "100%",
    height: "40%",
    marginVertical: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#f28c18",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  buttonText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#f28c18",
  },
  navbar: {
    backgroundColor: "#212630",
    width: "100%",
    borderRadius: 30,
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 10,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  userInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  role: {
    fontSize: 14,
  },
  fontLetter: {
    color: "#c5cedd",
  },
});
