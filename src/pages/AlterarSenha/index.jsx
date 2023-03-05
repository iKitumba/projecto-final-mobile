import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

import { API } from "../../services/api";
import { useToken } from "../../utils/useToken";
import { colors } from "../../theme/colors";

export default function AlterarSenha() {
  const navigation = useNavigation();
  const [senha_antiga, setSenha_antiga] = useState("");
  const [nova_senha, setNova_senha] = useState("");
  const [fetching, setFetching] = useState(false);

  function handleBack() {
    navigation.goBack();
  }

  async function handleChangePassword() {
    const token = await useToken();

    if (!senha_antiga) {
      return Alert.alert("Alerta", "Senha actual é obrigatória");
    }

    if (!nova_senha) {
      return Alert.alert("Alerta", "Nova senha é obrigatória");
    }

    try {
      setFetching(true);
      const { data } = await API.patch(
        "alunos/senha/alterar",
        { senha_antiga, nova_senha },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Sucesso", data.message);
      navigation.navigate("AlunoSettings");
    } catch (error) {
      Alert.alert("Erro", error.response.data.message);
    } finally {
      setFetching(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.goBack} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
            <Text style={styles.topOpctionName}>Alterar Senha</Text>
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        enabled={Platform.OS === "ios"}
        behavior="padding"
        style={styles.form}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha atual</Text>
          <TextInput
            placeholder="Digite a sua senha atual"
            placeholderTextColor="rgba(115, 134, 155, .4)"
            style={styles.input}
            secureTextEntry={true}
            autoCorrect={false}
            value={senha_antiga}
            onChangeText={setSenha_antiga}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nova senha</Text>
          <TextInput
            placeholder="Digite uma senha nova"
            placeholderTextColor="rgba(115, 134, 155, .4)"
            style={styles.input}
            secureTextEntry={true}
            autoCorrect={false}
            value={nova_senha}
            onChangeText={setNova_senha}
          />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            disabled={fetching}
            onPress={handleChangePassword}
          >
            <Text style={styles.buttonText}>
              {fetching ? "Alterando..." : "Alterar"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: Constants.statusBarHeight + 24,
    paddingHorizontal: 24,
  },
  header: {},
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  goBack: {
    flexDirection: "row",
    alignItems: "center",
  },
  topOpctionName: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "300",
    color: colors.text,
    textTransform: "uppercase",
  },

  form: {
    marginVertical: 24,
  },

  inputContainer: {
    marginBottom: 12,
  },
  label: {
    textTransform: "uppercase",
    fontSize: 10,
    color: "#73869B",
    marginBottom: 8,
  },
  input: {
    height: 46,
    borderWidth: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    borderColor: "rgba(97, 118, 141, 0.4)",
    borderRadius: 4,
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
