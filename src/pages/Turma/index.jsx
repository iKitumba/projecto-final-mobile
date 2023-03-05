import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import Title from "../../components/Title";
import Aluno from "../../components/Aluno";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API } from "../../services/api";

import Loading from "../../components/Loading";
import { colors } from "../../theme/colors";
import { useToken } from "../../utils/useToken";
import { formatPeriodo } from "../../utils/formatPeriodo";

export default function Turma() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { turma } = route.params;

  const formatedNomeCurso =
    turma.curso.titulo.length <= 20
      ? turma.curso.titulo
      : `${turma.curso.titulo.slice(0, 20)}...`;

  function navigateToBack() {
    navigation.goBack();
  }

  // function handleSaberMais() {
  //   navigation.navigate("AlunoPerfil");
  // }

  async function loadAllAlunos() {
    const token = await useToken();

    try {
      const { data } = await API.get(`turmas/${turma.id}/alunos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAlunos(data.alunos);
    } catch (error) {
      return Alert.alert("Erro", error.response?.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function refreshList() {
    setRefreshing(true);

    await loadAllAlunos();

    setRefreshing(false);
  }

  useEffect(() => {
    loadAllAlunos();
  }, [turma]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.goBack} onPress={navigateToBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
            <Text style={styles.topCursoName} numberOfLines={1}>
              {formatedNomeCurso}
            </Text>
          </TouchableOpacity>
          <Text style={styles.topPeriodo}>
            {formatPeriodo({ periodo: turma.turno })}
          </Text>
        </View>
        <View style={styles.bottomRow}>
          <Title
            text={`${turma.classe} ${turma.letra}`}
            stylesContainer={{ marginTop: 24, marginBottom: 24 }}
          />
          <Text style={styles.totalAlunos}>Total de {turma.alunos} alunos</Text>
        </View>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={alunos}
          onRefresh={refreshList}
          refreshing={refreshing}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item: aluno, index }) => (
            <Aluno
              id={aluno.id}
              // handleSaberMais={handleSaberMais}
              foto_perfil={aluno.foto_perfil_url}
              nome_completo={aluno.nome_completo}
              telefone_1={aluno.telefone_1}
              telefone_2={aluno.telefone_2}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: Constants.statusBarHeight + 24,
    paddingHorizontal: 24,
  },
  header: {},
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  goBack: {
    flexDirection: "row",
    alignItems: "center",
  },
  topCursoName: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "300",
    color: colors.text,
    textTransform: "uppercase",
  },
  topPeriodo: {
    color: colors.text,
    opacity: 0.4,
    fontSize: 12,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalAlunos: {
    color: colors.text,
    opacity: 0.4,
    fontSize: 12,
  },
});
