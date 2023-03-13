import { TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export default function ActionButton({ children, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    elevation: 10,
    // shadowColor: "rgba(0, 125, 255, .55)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    top: -30,

    width: 60,
    height: 60,
    backgroundColor: colors.accent,
  },
});
