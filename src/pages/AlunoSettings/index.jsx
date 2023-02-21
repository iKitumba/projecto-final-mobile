import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useContext } from "react";
import Constants from "expo-constants";

import { AuthContext } from "../../contexts/AuthContext";
import Title from "../../components/Title";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../theme/colors";

export default function AlunoSettings() {
  const navigation = useNavigation();
  const { handleLogout, usuario } = useContext(AuthContext);

  function navigateToAlterarSenha() {
    navigation.navigate("AlterarSenha");
  }

  return (
    <ScrollView style={styles.container}>
      <Title text="Configurações" stylesContainer={{ marginTop: 12 }} />

      <Text style={styles.secao}>Pessoal</Text>
      <TouchableOpacity style={styles.options}>
        <Text style={styles.key}>ID</Text>
        <Text style={styles.value}>{usuario?.id}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.options}>
        <Text style={styles.key}>Nome do pai</Text>
        <Text style={styles.value}>{usuario?.nome_pai}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.options}>
        <Text style={styles.key}>Nome da mãe</Text>
        <Text style={styles.value}>{usuario?.nome_mae}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.options}>
        <Text style={styles.key}>Nº do encarregado</Text>
        <Text style={styles.value}>{usuario?.telefone_1}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.options}>
        <Text style={styles.key}>Nº do Bilhete</Text>
        <Text style={styles.value}>{usuario?.bi}</Text>
      </TouchableOpacity>

      <Text style={styles.secao}>Preferências</Text>
      <TouchableOpacity style={styles.options} onPress={navigateToAlterarSenha}>
        <Text style={styles.key}>Alterar senha</Text>
        <Ionicons
          style={styles.value}
          name="arrow-forward"
          size={24}
          color={colors.primary}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.sairButton} onPress={handleLogout}>
        <Text style={styles.sairButtonText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: Constants.statusBarHeight + 24,
    paddingHorizontal: 24,
  },

  form: {
    marginVertical: 24,
  },

  secao: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#61768dc5",
    textTransform: "uppercase",
    marginTop: 32,
    marginBottom: 12,

    borderBottomColor: "#097dfa2b",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  key: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "bold",
  },

  value: {
    fontSize: 16,
    color: "#61768d76",
    fontWeight: "normal",
  },

  options: {
    width: "100%",
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sairButton: {
    marginVertical: 48,
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  sairButtonText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: "bold",
  },
});
