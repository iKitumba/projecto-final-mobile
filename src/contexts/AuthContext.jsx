import { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API } from "../services/api";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAnUser, setIsAnUser] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    async function loadStorageUser() {
      const storageUser = await AsyncStorage.getItem("@PAP:usuario");
      const storageToken = await AsyncStorage.getItem("@PAP:token");

      if (storageUser && storageToken) {
        setUsuario(JSON.parse(storageUser));
      }
      setLoading(false);
    }

    loadStorageUser();
  }, []);

  async function handleLogout() {
    await AsyncStorage.multiRemove(["@PAP:usuario", "@PAP:token"]);

    setUsuario(null);
  }

  async function handleLogin({ username, senha }) {
    try {
      setFetching(true);
      const { data } = await API.post("sessao", {
        bi: String(username).trim(),
        senha,
      });

      await AsyncStorage.setItem(
        "@PAP:usuario",
        JSON.stringify(data.usuario || data.aluno)
      );
      await AsyncStorage.setItem("@PAP:token", data.token);

      setUsuario(data.usuario || data.aluno);
    } catch (error) {
      Alert.alert("Erro", error.response?.data.message);
    } finally {
      setFetching(false);
    }
  }

  async function handleLoginAluno({ bi, senha }) {
    try {
      setFetching(true);
      const { data } = await API.post("alunos_sessao", {
        bi,
        senha,
      });

      await AsyncStorage.setItem("@PAP:usuario", JSON.stringify(data.aluno));
      await AsyncStorage.setItem("@PAP:token", data.token);

      setUsuario(data.aluno);
    } catch (error) {
      Alert.alert("Erro", error.response?.data.message);
    } finally {
      setFetching(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        logged: !!usuario,
        handleLogout,
        isAnUser,
        setIsAnUser,
        handleLogin,
        handleLoginAluno,
        usuario,
        loading,
        fetching,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
