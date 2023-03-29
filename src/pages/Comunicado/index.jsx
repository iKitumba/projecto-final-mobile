import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

import { API } from "../../services/api";
import { colors } from "../../theme/colors";
import { useToken } from "../../utils/useToken";

export default function Comunicado() {
  const navigation = useNavigation();
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [fetching, setFetching] = useState(false);

  function handleBack() {
    navigation.goBack();
  }

  async function handleSubmit() {
    const token = await useToken();

    if (!titulo) {
      return Alert.alert("Alerta", "O título é obrigatório para o comunicado");
    }

    if (!conteudo) {
      return Alert.alert(
        "Alerta",
        "O conteudo é obrigatório para o comunicado"
      );
    }

    try {
      setFetching(true);
      const { data } = await API.post(
        "comunicados",
        { titulo, conteudo },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Alert.alert("Sucesso", "Comunicado criado com sucesso");
      navigation.navigate("Comunicados");
    } catch (error) {
      return Alert.alert("Erro", error.response.data.message);
    } finally {
      setFetching(false);
    }
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.goBack} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
            <Text style={styles.topOpctionName}>Comunicado</Text>
          </TouchableOpacity>
        </View>
      </View> */}

      <ScrollView style={styles.form}>
        <KeyboardAvoidingView
          behavior="padding"
          enabled={Platform.OS === "ios"}
        >
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Assunto</Text>
            <TextInput
              placeholder="Assunto do comunicado"
              placeholderTextColor={colors.border}
              style={styles.input}
              autoCapitalize="words"
              value={titulo}
              onChangeText={setTitulo}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Texto</Text>
            <TextInput
              placeholder="O que desejas comunicar?"
              style={[styles.input, { height: 118 }]}
              placeholderTextColor={colors.border}
              multiline={true}
              numberOfLines={5}
              autoCapitalize="sentence"
              value={conteudo}
              onChangeText={setConteudo}
            />
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.button}
              disabled={!titulo || !conteudo || fetching}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>
                {fetching ? "Publicando..." : "Publicar"}
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    // paddingTop: Constants.statusBarHeight + 24,
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
    fontWeight: "bold",
    color: colors.text,
  },

  form: {
    marginTop: 24,
    paddingBottom: 24,
  },

  inputContainer: {
    marginBottom: 12,
  },
  label: {
    textTransform: "uppercase",
    fontSize: 12,
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    height: 46,
    borderWidth: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    borderColor: colors.border,
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
