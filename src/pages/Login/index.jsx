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
} from "react-native";

import { AuthContext } from "../../contexts/AuthContext";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import logoImg from "../../assets/logo.png";
import { colors } from "../../theme/colors";

export default function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [visible, setVisible] = useState(false);
  const { handleLogin, fetching } = useContext(AuthContext);

  function navigateEsqueciMinhaSenha() {
    navigation.navigate("EsqueciMinhaSenha");
  }

  function toggleVisibility() {
    setVisible((prev) => !prev);
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === "ios"}
      style={styles.container}
    >
      <Image source={logoImg} style={styles.logo} />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>ID, BI, USERNAME</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite um dos items a cima"
          placeholderTextColor={colors.border}
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>SENHA</Text>
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
            placeholder="Digite sua senha"
            placeholderTextColor={colors.border}
            secureTextEntry={!visible}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={toggleVisibility}>
            <Ionicons
              name={visible ? "eye-outline" : "eye-off-outline"}
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={navigateEsqueciMinhaSenha}>
        <Text style={styles.microText}>Esqueci minha senha ):</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.submitButton}
        disabled={!username || !senha || fetching}
        onPress={() => handleLogin({ username, senha })}
      >
        <LinearGradient
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["#5FBDFF", "#5678F8"]}
        >
          <Text style={styles.buttonText}>
            {fetching ? "ENTRADO..." : "ENTRAR"}
          </Text>
          <Ionicons name="arrow-forward" size={24} color={colors.primary} />
        </LinearGradient>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },

  logo: {
    marginBottom: 46,
  },

  inputContainer: {
    width: "100%",
    paddingHorizontal: 24,
  },

  label: {
    fontSize: 12,
    color: colors.text,
    marginBottom: 8,
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

  gradient: {
    width: "100%",
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    borderRadius: 4,
  },

  submitButton: {
    width: "100%",
    paddingHorizontal: 24,
    height: 46,
    marginTop: 46,
  },

  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});
