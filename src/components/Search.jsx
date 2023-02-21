import { View, TouchableOpacity, StyleSheet, TextInput } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { colors } from "../theme/colors";

export default function Search() {
  return (
    <View style={styles.searchContainer}>
      <TextInput style={styles.searchInput} placeholder="Quem procuras?" />
      <TouchableOpacity style={styles.searchIconContainer}>
        <Ionicons name="search" size={24} color="#F7F7F7" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: {
    width: "80%",
    paddingHorizontal: 22,
    height: 46,
    borderWidth: 1,
    borderColor: "#B3BFCB",
    borderRadius: 23,
  },
  searchIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.grey,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
});
