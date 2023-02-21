import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { handleCall } from "../utils/handleCall";

import { colors } from "../theme/colors";

export default function Professor({ nome_completo, telefone }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.td}>
        <Text style={styles.tdText}>{nome_completo}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.td} onPress={() => handleCall(telefone)}>
        <Ionicons
          name="call-outline"
          size={24}
          style={{ alignSelf: "flex-end" }}
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
    paddingHorizontal: 12,
  },
  tdText: {
    fontSize: 16,
    color: colors.text,
  },
});
