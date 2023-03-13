import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Title from "../../components/Title";
import ProfessorDisciplinaTelefone from "../../components/ProfessorDiciplinaTelefone";
import { useToken } from "../../utils/useToken";
import { API } from "../../services/api";
import Loading from "../../components/Loading";
import { colors } from "../../theme/colors";
import { formatPeriodo } from "../../utils/formatPeriodo";

export default function Professores() {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const [professoresDisciplinas, setProfessoresDisciplinas] = useState([]);
  const { turma_id, curso, turno, turma } = route.params;

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function loadAllProfessores() {
      const token = await useToken();

      try {
        const {
          data: { turma_professores_disciplinas },
        } = await API.get(`/turmas/${turma_id}/professores`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfessoresDisciplinas(turma_professores_disciplinas);
      } catch (error) {
        return Alert.alert("Erro", error.response?.data.message);
      } finally {
        setLoading(false);
      }
    }

    loadAllProfessores();
  }, [turma_id]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.goBack} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
            <Text style={styles.topCursoName}>
              {curso.diminuitivo} {turma.classe}
              {turma.letra}
            </Text>
          </TouchableOpacity>
          <Text style={styles.topPeriodo}>
            {formatPeriodo({ periodo: turno })}
          </Text>
        </View>
        <View style={styles.bottomRow}>
          <Title
            text="Professores"
            stylesContainer={{ marginTop: 24, marginBottom: 24 }}
          />
        </View>
      </View>

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={professoresDisciplinas}
          keyExtractor={(item) => item.disciplina.id}
          renderItem={({ item, index }) => {
            return (
              <ProfessorDisciplinaTelefone
                disciplina={item.disciplina}
                professor={item.professor}
              />
            );
          }}
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
    fontWeight: "bold",
    color: colors.text,
  },
  topPeriodo: {
    color: colors.text,
    fontSize: 12,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  thead: {
    textTransform: "uppercase",
    fontSize: 12,
    color: colors.text,
    flex: 1,
    paddingHorizontal: 4,
    textAlign: "center",
  },
});
