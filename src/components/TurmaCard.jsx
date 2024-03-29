import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { colors } from "../theme/colors";
import { formatPeriodo } from "../utils/formatPeriodo";

export default function TurmaCard({
  classe,
  curso,
  periodo,
  num_alunos,
  onPress,
  disciplina,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={styles.turmaContainer}
    >
      <View style={styles.turmaMetadata}>
        <Text style={styles.classe} numberOfLines={1}>
          {classe}
        </Text>
        <Text style={styles.curso}>{curso}</Text>
      </View>
      <View style={styles.turmaInfo}>
        <Text style={styles.periodo}>{formatPeriodo({ periodo })}</Text>
        {disciplina && (
          <Text style={styles.disciplina}>
            {disciplina.titulo.length > 10
              ? disciplina.diminuitivo
              : disciplina.titulo}
          </Text>
        )}
        <Text style={styles.num_alunos}>
          <Text style={{ fontWeight: "bold" }}>{num_alunos}</Text> aluno
          {num_alunos > 1 ? "s" : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  turmaContainer: {
    width: "100%",
    height: 104,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    borderColor: colors.border,
  },
  turmaMetadata: {
    width: 80,
    height: 80,
    backgroundColor: colors.grey,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: "space-between",
  },
  classe: {
    fontSize: 24,
    fontWeight: "bold",
    maxWidth: "100%",
    color: colors.text,
  },
  curso: {
    textTransform: "uppercase",
    color: colors.text,
    fontSize: 14,
  },
  turmaInfo: {
    justifyContent: "space-around",
  },
  periodo: {
    fontSize: 16,
    color: colors.text,
    textAlign: "right",
  },
  disciplina: {
    fontSize: 12,
    color: colors.text,
    textAlign: "right",
  },
  num_alunos: {
    fontSize: 16,
    color: colors.text,
    textAlign: "right",
  },
});
