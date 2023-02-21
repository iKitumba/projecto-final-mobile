import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { handleCall } from "../utils/handleCall";

import { colors } from "../theme/colors";

export default function ProfessorDisciplinaTelefone({ professor, disciplina }) {
  const nomeProfessorFormatted =
    professor.nome_completo.length <= 9
      ? professor.nome_completo
      : `${professor.nome_completo.slice(0, 9)}...`;

  const disciplinaFormatted =
    disciplina.titulo.length > 9 ? disciplina.diminuitivo : disciplina.titulo;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.td}>
        <Text style={styles.tdText} numberOfLines={1}>
          {nomeProfessorFormatted}
        </Text>
      </TouchableOpacity>
      <Text style={styles.tdText} numberOfLines={1}>
        {disciplinaFormatted}
      </Text>
      <TouchableOpacity
        style={styles.td}
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
    backgroundColor: "#F5FAFF",
    paddingVertical: 8,
    borderRadius: 4,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#61768d7f",
  },
  td: {
    flex: 1,
    paddingLeft: 12,
    textAlign: "center",
  },
  tdText: {
    fontSize: 16,
    color: colors.text,
  },
});
