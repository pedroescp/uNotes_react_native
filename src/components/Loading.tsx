import { View } from "react-native";
import Lottie from "lottie-react-native";
import { Text } from "react-native-elements";

export default function Loading() {
  return (
    <View style={{position: "absolute", zIndex: 999, width: "110%", height: '110%', backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: "center", justifyContent: "center"}}>
      <Lottie source={require("../../src/icons/loading.json")} autoPlay loop style={{width: 200, height: 200}} />
    </View>
  );
}