import { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { colors } from "../../theme/colors";

export default function EsqueciMinhaSenha() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [visible, setVisible] = useState(false);

  function handleBack() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      enabled={Platform.OS === "ios"}
    >
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.goBack} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
            <Text style={styles.topOpctionName}>Curso</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>ID, BI, USERNAME</Text>
        <View
          style={[
            styles.input,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
        >
          <TextInput
            style={styles.inputField}
            placeholder="Digite um dos items a cima"
            placeholderTextColor={colors.border}
          />
          <TouchableOpacity
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {}}
          >
            <Ionicons name="send-sharp" size={14} color={colors.completary} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Código de confirmação</Text>
        <TextInput
          style={styles.input}
          placeholder="Pega da mensagem que recebeu"
          placeholderTextColor={colors.border}
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 24,
        }}
      >
        <TouchableOpacity
          style={styles.submitButton}
          disabled={!username || !senha}
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>RECUPERAR</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: Constants.statusBarHeight + 24,
    backgroundColor: colors.primary,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
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

  inputContainer: {
    width: "100%",
    paddingHorizontal: 24,
    marginBottom: 12,
  },

  label: {
    fontSize: 12,
    color: colors.text,
    marginBottom: 8,
    textTransform: "uppercase",
  },

  input: {
    width: "100%",
    height: 46,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },

  inputField: {
    flex: 1,
    height: 46,
    alignItems: "center",
  },

  microText: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.5,
  },

  submitButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    marginTop: 46,
    backgroundColor: colors.accent,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },

  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});
