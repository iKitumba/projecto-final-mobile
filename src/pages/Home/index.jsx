import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

import Title from "../../components/Title";
import TurmaCard from "../../components/TurmaCard";
import Loading from "../../components/Loading";
import { API } from "../../services/api";
import { useToken } from "../../utils/useToken";
import { AuthContext } from "../../contexts/AuthContext";
import { colors } from "../../theme/colors";

export default function Home() {
  const { usuario } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [turmas, setTurmas] = useState([]);
  const { tipo_usuario } = usuario;

  async function loadTurmas() {
    const token = await useToken();
    try {
      const { data } = await API.get("professores/turmas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTurmas(data.turmas);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  function navigateToTurma({ turma }) {
    navigation.navigate("Turma", { turma });
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
      {/* <Search /> */}

      {/* <View style={styles.content}> */}
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          ListHeaderComponent={
            <Title text="Turmas" stylesContainer={{ marginTop: 24 }} />
          }
          data={turmas}
          onRefresh={refreshList}
          refreshing={refreshing}
          style={styles.turmasList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item: turma, index }) => {
            return (
              <TurmaCard
                disciplina={tipo_usuario === "PROFESSOR" && turma.disciplina}
                classe={`${turma.classe} ${turma.letra}`}
                curso={turma.curso.diminuitivo}
                num_alunos={turma.alunos}
                periodo={turma.turno}
                onPress={() => navigateToTurma({ turma })}
              />
            );
          }}
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
    paddingHorizontal: 24,
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
