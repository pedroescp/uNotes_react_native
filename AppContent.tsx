import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import Home from "./src/components/home";
import Login from "./src/components/login";
import Navbar from "./src/components/navbar";
import { AuthContext, AuthProvider } from "./src/content/auth";

const Stack = createNativeStackNavigator();

export default function AppContent() {
  const Private = ({ children, navigation }: any) => {
    const { authenticated, loading }: any = useContext(AuthContext);

    if (loading) return <div className="loading">Carregando...</div>;

    if (!authenticated) navigation.navegate("Home"); 

    return children;
  };

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
