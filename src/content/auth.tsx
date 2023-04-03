import {
  createContext,
  useEffect,
  useState,
} from "react";
import api from "../utils/api";
import { getData, removeData, saveData } from "../utils/asyncStorage";

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
    console.log(email, senha);
    
    const loginData = {
      emailLogin: email,
      senha: senha,
    };

    try {
      const response = await api.usuarioAuth(loginData);
      console.log(response);
      if (response.data) {
        saveData("user", JSON.stringify(response.data));
        saveData("token", JSON.stringify(response.data.data.token));
        navigation?.navigate("Home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    removeData("user");
    removeData("token");
    setUser(null);
    //navigate("/");
  };
  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
