import { View, StyleSheet } from "react-native";
import Navbar from "./src/components/navbar";

export default function App() {
  return <Navbar />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
    color: "#f28c18",
    padding: 10,
  },
});
