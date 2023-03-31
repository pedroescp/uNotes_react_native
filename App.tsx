// import AppContent from "./AppContent";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/components/home";
import Login from "./src/components/login";
import Navbar from "./src/components/navbar";
import NoteCharge from "./src/components/note";
import { AuthProvider } from "./src/content/auth";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
         <AuthProvider>
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
            name="Notes"
            component={NoteCharge}
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
        </AuthProvider>
      </NavigationContainer>
  );
}
