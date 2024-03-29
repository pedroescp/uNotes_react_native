// import AppContent from "./AppContent";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/components/home";
import Login from "./src/components/login";
import NoteCharge from "./src/components/note";
import { AuthProvider } from "./src/content/auth";
import Profile from "./src/components/profile";
import Archived from "./src/components/Archived";
import Trash from "./src/components/Trash";
import Document from "./src/components/document";
import DocumentEdit from "./src/components/documentEdit";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              headerLeft: () => null,
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

          <Stack.Screen
            name="Profile"
            component={Profile}
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
            name="Archived"
            component={Archived}
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
            name="Document"
            component={Document}
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
            name="DocumentEdit"
            component={DocumentEdit}
            options={{
              headerShown: false,
              title: "DocumentEdit",
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
            name="Trash"
            component={Trash}
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
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
