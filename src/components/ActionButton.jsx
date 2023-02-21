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
    // width: 60,
    // height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    elevation: 10,
    // shadowColor: "rgba(0, 125, 255, .55)",
    // shadowOffset: {
    //   width: 0,
    //   height: 10,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.5,
    top: -30,
    // backgroundColor: colors.accent,

    width: 60,
    height: 60,
    shadowColor: "rgba(0, 125, 255, 0.55)",
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 40,
    backgroundColor: colors.accent,
  },
});
