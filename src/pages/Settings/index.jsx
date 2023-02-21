import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useContext } from "react";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native-expo-image-cache";

import { AuthContext } from "../../contexts/AuthContext";
import Title from "../../components/Title";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";

export default function Settings() {
  const navigation = useNavigation();
  const { handleLogout, usuario } = useContext(AuthContext);

  function navigateToAlterarUsuarioSenha() {
    navigation.navigate("AlterarUsuarioSenha");
  }

  return (
    <ScrollView style={styles.container}>
      <Title text="Configurações" stylesContainer={{ marginTop: 12 }} />
      <Image
        uri={usuario.foto_perfil_url}
        // source={{ uri: usuario.foto_perfil_url }}
        style={styles.foto_perfil_url}
      />
      <Text style={styles.nome_completo} numberOfLines={1}>
        {usuario.nome_completo}
      </Text>
      <Text style={styles.secao}>Pessoal</Text>
      <TouchableOpacity style={styles.options}>
        <Text style={styles.key}>Permissão</Text>
        <Text style={styles.value}>{usuario.tipo_usuario}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.options}>
        <Text style={styles.key}>Telefone</Text>
        <Text style={styles.value}>{usuario.telefone}</Text>
      </TouchableOpacity>
      <Text style={styles.secao}>Preferências</Text>
      <TouchableOpacity
        style={styles.options}
        onPress={navigateToAlterarUsuarioSenha}
      >
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
    paddingBottom: 116,
  },

  form: {
    marginVertical: 24,
  },

  foto_perfil_url: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: colors.accent,
    resizeMode: "contain",
    alignSelf: "center",
  },

  nome_completo: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    alignSelf: "center",
    marginTop: 24,
    marginBottom: 12,
  },

  secao: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#61768dc5",
    textTransform: "uppercase",
    marginTop: 32,
    marginBottom: 12,
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
    marginBottom: 116,
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
