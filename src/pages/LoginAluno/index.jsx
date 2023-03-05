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

export default function LoginAluno() {
  const navigation = useNavigation();
  const [bi, setBi] = useState("");
  const [senha, setSenha] = useState("");
  const [visible, setVisible] = useState(false);
  const { handleLoginAluno, fetching } = useContext(AuthContext);

  function navigateToLogin() {
    navigation.navigate("Login");
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
        <Text style={styles.label}>BI/ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Bilhete de identidade ou ID"
          placeholderTextColor="rgba(115, 134, 155, .4)"
          autoCorrect={false}
          autoCapitalize="none"
          value={bi}
          onChangeText={setBi}
          maxLength={14}
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
            placeholderTextColor="rgba(115, 134, 155, .4)"
            secureTextEntry={!visible}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={toggleVisibility}>
            <Ionicons
              name={visible ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="#73869B"
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={styles.microText}>Entrar com usuário e senha</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={!bi || !senha || fetching}
        style={styles.submitButton}
        onPress={() => handleLoginAluno({ bi, senha })}
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
    fontSize: 10,
    color: "#73869B",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 46,
    borderWidth: 1,
    borderColor: colors.grey,
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
    fontSize: 16,
    color: "#73869B",
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
