import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { handleCall } from "../utils/handleCall";

import { colors } from "../theme/colors";

export default function ProfessorDisciplinaTelefone({ professor, disciplina }) {
  const nomeProfessorFormatted =
    professor.nome_completo.length <= 35
      ? professor.nome_completo
      : `${professor.nome_completo.slice(0, 32)}...`;

  const disciplinaFormatted =
    disciplina.titulo.length > 40 ? disciplina.diminuitivo : disciplina.titulo;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.td}>
        <Text style={styles.profName} numberOfLines={1}>
          {nomeProfessorFormatted}
        </Text>
        <Text style={styles.profDisciplina} numberOfLines={1}>
          {disciplinaFormatted}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.callIconContainer}
        onPress={() => handleCall(professor.telefone)}
      >
        <Ionicons
          name="call-outline"
          size={24}
          style={{ alignSelf: "center" }}
          color={colors.accent}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    borderRadius: 6,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: colors.border,
  },
  td: {
    flex: 1,
    textAlign: "center",
  },
  profName: {
    fontSize: 16,
    color: colors.text,
  },
  profDisciplina: {
    fontSize: 10,
    textTransform: "uppercase",
    color: colors.text,
  },
  callIconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
