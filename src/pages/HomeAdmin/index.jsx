import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Alert } from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

import Title from "../../components/Title";
import TurmaCard from "../../components/TurmaCard";
import Loading from "../../components/Loading";
import { API } from "../../services/api";
import { useToken } from "../../utils/useToken";
import { AuthContext } from "../../contexts/AuthContext";
import { colors } from "../../theme/colors";

import CursoList from "../../components/CursoList";

export default function HomeAdmin() {
  const { usuario } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [cursos, setCursos] = useState([]);

  async function loadTurmas() {
    const token = await useToken();
    try {
      const { data } = await API.get("cursos/show", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCursos(data.cursos);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", error.response?.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function refreshList() {
    setRefreshing(true);

    await loadTurmas();

    setRefreshing(false);
  }

  useEffect(() => {
    loadTurmas();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          onRefresh={refreshList}
          refreshing={refreshing}
          contentContainerStyle={{ paddingBottom: 90 }}
          data={cursos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CursoList curso={item} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: colors.primary,
    // paddingHorizontal: 24,
    // paddingVertical: 24,
  },
  turmasList: {
    // flex: 1,
    // paddingBottom: 216,
  },
  content: {
    // marginBottom: 116,
  },
  profContainer: {},
  profHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  thead: {
    textTransform: "uppercase",
    fontSize: 16,
    color: colors.text,
    flex: 1,
    paddingHorizontal: 4,
  },
});
