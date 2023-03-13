import { View, Text, StyleSheet } from "react-native";

import { colors } from "../theme/colors";

export function TitleWithOrnament({
  text,
  stylesContainer,
  stylesOrnament,
  stylesText,
}) {
  return (
    <View style={[styles.container, stylesContainer]}>
      <View style={[styles.ornament, stylesOrnament]} />
      <Text style={[styles.text, stylesText]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 46,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  ornament: {
    width: 8,
    height: 21,
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    marginLeft: 8,
    fontSize: 26,
    fontWeight: "bold",
    color: colors.text,
  },
});
