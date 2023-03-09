import { StyleSheet } from "react-native";
import Home from "./src/components/home";
import Login from "./src/components/login";
import Navbar from "./src/components/navbar";

export default function App() {
  return (
      <Login />
  );
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
