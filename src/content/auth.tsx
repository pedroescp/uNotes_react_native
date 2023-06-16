import {
  createContext,
  useEffect,
  useState,
} from "react";
import api from "../utils/api";
import { getData, removeData, saveData } from "../utils/asyncStorage";
import { Alert } from "react-native";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      let user = await getData("token");

      return user;
    };
    getUser()

    setLoading(false);
  }, []);

  const login = async (email: any, senha: any, navigation: any) => {
    const loginData = {
      emailLogin: email,
      senha: senha,
    };
    try {
      const response = await api.usuarioAuth(loginData);

      if (response.data) {
        saveData("user", JSON.stringify(response.data));
        saveData("token", JSON.stringify(response.data.data.token));
        navigation?.navigate("Home");
        return true
      } else {
        alert("Usuário ou senha inválida. Tente novamente.")
        return false
      }


    } catch (error) {
      alert("Usuário ou senha inválida. Tente novamente.")
      return false

    }
  };

  const logout = () => {
    removeData("user");
    removeData("token");
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
