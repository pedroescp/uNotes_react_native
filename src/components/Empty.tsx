import { View } from "react-native";
import Lottie from "lottie-react-native";
import { Text } from "react-native-elements";

export default function Empty() {
  return (
    <View style={{position: "absolute", justifyContent: "center", alignItems: "center"}}>
      <Lottie source={require("../../src/icons/empty.json")} autoPlay loop style={{width: 200, height: 200}} />
      <Text style={{fontSize: 25, fontWeight: "bold", color: "#9ea1a6"}}>Parece que por aqui está vazio</Text>
    </View>
  );
}