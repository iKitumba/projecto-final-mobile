import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { colors } from "../theme/colors";

export default function TurmaCard({
  classe,
  curso,
  periodo,
  num_alunos,
  onPress,
  disciplina,
}) {
  return (
    <View style={styles.turmaContainer}>
      <TouchableOpacity onPress={onPress} style={styles.turmaMetadata}>
        <Text style={styles.classe}>{classe}</Text>
        <Text style={styles.curso}>{curso}</Text>
      </TouchableOpacity>
      <View style={styles.turmaInfo}>
        <Text style={styles.periodo}>{periodo}</Text>
        {disciplina && (
          <Text style={styles.disciplina}>
            {disciplina.titulo.length > 10
              ? disciplina.diminuitivo
              : disciplina.titulo}
          </Text>
        )}
        <Text style={styles.num_alunos}>{num_alunos} alunos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  turmaContainer: {
    width: "100%",
    height: 104,
    backgroundColor: "#F6F7F8",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    borderColor: colors.grey,
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
    color: "#F5FAFF",
  },
  curso: {
    textTransform: "uppercase",
    color: "#F5FAFF",
    fontSize: 14,
  },
  turmaInfo: {
    justifyContent: "space-around",
  },
  periodo: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "right",
  },
  disciplina: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.text,
    textAlign: "right",
  },
  num_alunos: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "right",
  },
});
