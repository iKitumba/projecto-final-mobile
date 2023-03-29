import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";

export default function FormActionButton({
  text,
  onPress,
  variant = "outlined",
  buttonStyle,
  textStyle,
  ...props
}) {
  const styleShouldApply =
    variant === "outlined"
      ? {
          borderWidth: 1,
          borderColor: colors.danger,
        }
      : {
          backgroundColor: colors.accent,
        };

  return (
    <TouchableOpacity
      style={[styles.container, styleShouldApply, buttonStyle]}
      onPress={onPress}
      {...props}
    >
      <Text
        style={[
          {
            color: variant === "outlined" ? colors.danger : colors.white,
            fontSize: 16,
            fontWeight: "bold",
            textTransform: "uppercase",
          },
          textStyle,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    height: 46,
    marginHorizontal: 6,
  },
});
