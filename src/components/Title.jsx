import { View, Text, StyleSheet } from "react-native";

import { colors } from "../theme/colors";

export default function Title({ text, stylesContainer, stylesText }) {
  return (
    <View style={[styles.container, stylesContainer]}>
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
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.accent,
  },
});
