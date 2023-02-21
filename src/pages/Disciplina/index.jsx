import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useToken } from "../../utils/useToken";
import { useNavigation } from "@react-navigation/native";
import { API } from "../../services/api";
import { colors } from "../../theme/colors";

export default function Disciplina() {
  const navigation = useNavigation();
  const [titulo, setTitulo] = useState("");
  const [diminuitivo, setDiminuitivo] = useState("");
  const [fetching, setFetching] = useState(false);

  function handleBack() {
    navigation.goBack();
  }

  async function handleSubmit() {
    const token = await useToken();

    if (!String(titulo).trim()) {
      return Alert.alert("Alerta", "Digita um título para a disciplina");
    }

    if (!String(diminuitivo).trim()) {
      return Alert.alert(
        "Alerta",
        "Digita uma sigla ou abreviação para a disciplina"
      );
    }

    try {
      setFetching(true);
      const { data } = await API.post(
        "disciplinas",
        {
          titulo: String(titulo).trim(),
          diminuitivo: String(diminuitivo).trim(),
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Sucesso", "Disciplina criada com sucesso!");

      return navigation.navigate("TurmaRoutes");
    } catch (error) {
      return Alert.alert("Erro", error.response?.data.message);
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
            <Text style={styles.topOpctionName}>Disciplina</Text>
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS === "ios"}
        style={styles.form}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Titulo</Text>
          <TextInput
            placeholder="Titulo da disciplina"
            placeholderTextColor="rgba(115, 134, 155, .4)"
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Diminuitivo</Text>
          <TextInput
            placeholder="Uma abreviação para a disciplina"
            style={styles.input}
            placeholderTextColor="rgba(115, 134, 155, .4)"
            autoCapitalize="characters"
            value={diminuitivo}
            onChangeText={setDiminuitivo}
          />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            disabled={!titulo || !diminuitivo || fetching}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>
              {fetching ? "Criando..." : "Criar"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.danger }]}
            onPress={handleBack}
          >
            <Text style={styles.buttonText}>Descartar</Text>
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
    backgroundColor: "#F5FAFF",
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
