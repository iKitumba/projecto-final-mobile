import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Title from "./Title";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { formatPeriodo } from "../utils/formatPeriodo";
import { useNavigation } from "@react-navigation/native";

export default function CursoList({ curso }) {
  const navigation = useNavigation();
  const { id, titulo, diminuitivo } = curso;

  function navigateToTurma({ turma }) {
    // console.log(JSON.stringify(turma, null, 2));
    navigation.navigate("Turma", { turma });
  }

  return (
    <View style={{ paddingLeft: 24 }}>
      <Title
        text={curso.titulo}
        stylesText={{ fontSize: 20 }}
        stylesContainer={{ marginTop: 24, marginBottom: 12 }}
      />
      <FlatList
        horizontal={true}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        data={curso.turmas}
        renderItem={({ item }) => (
          <View style={styles.turmaContainer}>
            <View style={styles.row}>
              <Text style={styles.classe}>
                {`${item.classe} ${item.letra}`}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigateToTurma({
                    turma: { ...item, curso: { id, titulo, diminuitivo } },
                  })
                }
              >
                <Ionicons name="scan-outline" size={24} color={colors.accent} />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Período</Text>
              <Text style={styles.value}>
                {formatPeriodo({ periodo: item.turno })}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Alunos</Text>
              <Text style={styles.value}>{item.alunos}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  turmaContainer: {
    width: 310,
    height: 146,
    backgroundColor: colors.white,
    marginRight: 24,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    paddingVertical: 24,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  classe: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.text,
  },
  key: {
    fontSize: 16,
    color: colors.text,
  },
  value: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "bold",
  },
});
