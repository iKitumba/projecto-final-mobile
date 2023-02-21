import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { colors } from "../theme/colors";

export default function NotasDisciplina({
  disciplina,
  nota1,
  nota2,
  nota3,
  handleNavigateToAddNotas,
  diminuitivo,
}) {
  const disciplinaFormatted =
    disciplina.length <= 17 ? disciplina : diminuitivo;
  const media = Math.round(Number((nota1 + nota2 + nota3) / 3));
  const colorToApply =
    media < 10
      ? colors.danger
      : media > 10 && media < 15
      ? colors.yellow
      : colors.green;
  return (
    <TouchableOpacity
      onPress={handleNavigateToAddNotas}
      style={[
        styles.notaWrapper,
        {
          borderLeftColor: colorToApply,
        },
      ]}
    >
      <Text
        style={[
          styles.notaContainer,
          // {
          //   color: colorToApply,
          // },
        ]}
      >
        {disciplinaFormatted}
      </Text>
      <Text
        style={[
          styles.notaContainer,
          // {
          //   color: colorToApply,
          // },
        ]}
      >
        ({nota1}, {nota2}, {nota3}, {media})
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  notaWrapper: {
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderLeftWidth: 4,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  notaContainer: {
    fontSize: 16,
    color: colors.text,
  },
});
