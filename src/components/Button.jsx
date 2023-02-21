import { TouchableOpacity, StyleSheet, Text } from "react-native";

import { colors } from "../theme/colors";

export default function Button({
  outlined,
  text,
  stylesContainer,
  stylesText,
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        outlined
          ? [styles.containerOutlined, stylesContainer]
          : [styles.container, stylesContainer]
      }
    >
      <Text
        style={[
          styles.text,
          stylesText,
          { color: outlined ? colors.text : colors.primary },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "45%",
    height: 28,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  containerOutlined: {
    backgroundColor: "transparent",
    width: "45%",
    height: 28,
    borderWidth: 1,
    borderColor: colors.text,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
});
