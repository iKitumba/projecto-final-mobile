import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useContext } from "react";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../../contexts/AuthContext";
import { colors } from "../../theme/colors";

export default function PreLogout() {
  const navigation = useNavigation();
  const { handleLogout } = useContext(AuthContext);

  function handleBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titlePrelogout}>Tem a certeza que deseja sair?</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Não</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.danger }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Sim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: Constants.statusBarHeight + 24,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    marginVertical: 24,
  },

  titlePrelogout: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.text,
  },

  actions: {
    flexDirection: "row",
    marginTop: 46,
    justifyContent: "space-between",
    alignItems: "center",
  },

  button: {
    flex: 1,
    backgroundColor: colors.accent,
    marginHorizontal: 6,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
    textTransform: "uppercase",
  },
});
