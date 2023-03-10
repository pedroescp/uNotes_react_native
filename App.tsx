import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import Home from "./src/components/home";
import Login from "./src/components/login";
import Navbar from "./src/components/navbar";
import { StatusBar } from 'react-native';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            title: "Login",
            headerStyle: {
              backgroundColor: "#334155",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            title: "Home",
            headerStyle: {
              backgroundColor: "#334155",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Navbar"
          component={Navbar}
          options={{
            headerShown: false,
            title: "Home",
            headerStyle: {
              backgroundColor: "#334155",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
