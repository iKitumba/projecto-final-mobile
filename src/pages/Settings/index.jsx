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
import { cargos } from "../../constants/cargos";

export default function Settings() {
  const navigation = useNavigation();
  const { handleLogout, usuario } = useContext(AuthContext);
  const cargo = cargos.filter((cargo) => cargo.id === usuario.tipo_usuario)[0]
    .name;
  const nomeCompleto =
    usuario.nome_completo.length > 19
      ? `${usuario.nome_completo.slice(0, 18)}...`
      : usuario.nome_completo;
  const username =
    usuario.username.length > 19
      ? `${usuario.username.slice(0, 18)}...`
      : usuario.username;

  const telefone =
    usuario.telefone.length > 19
      ? `${usuario.telefone.slice(0, 18)}...`
      : usuario.telefone;
  const cargoDoUsuario = cargo.length > 19 ? `${cargo.slice(0, 18)}...` : cargo;

  function navigateToAlterarUsuarioSenha() {
    navigation.navigate("AlterarUsuarioSenha");
  }

  function navigateToBack() {
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title text="Configurações" stylesContainer={{ marginTop: 0 }} />
        <Image
          uri={usuario.foto_perfil_url}
          // source={{ uri: usuario.foto_perfil_url }}
          style={styles.foto_perfil_url}
        />
      </View>

      <View style={styles.userMicroInfo}>
        <Text style={styles.nome_completo} numberOfLines={1}>
          {nomeCompleto}
        </Text>
        <Text style={styles.cargo} numberOfLines={1}>
          {cargoDoUsuario}
        </Text>
      </View>

      <Text style={styles.secao}>Pessoal</Text>
      <TouchableOpacity style={styles.options}>
        <Text style={styles.key}>Username</Text>
        <Text style={styles.value}>@{username}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.options}>
        <Text style={styles.key}>Sexo</Text>
        <Text style={styles.value}>
          {usuario.genero === "M" ? "Masculino" : "Femenino"}
        </Text>
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
  userInfoContainer: {
    flexDirection: "row",
    marginTop: 12,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userMicroInfo: {
    marginTop: 24,
  },
  cargo: {
    fontSize: 16,
    color: colors.text,
  },

  userInfoTexts: {
    marginLeft: 12,
    justifyContent: "space-around",
  },

  userInfoText: {
    fontSize: 16,
    color: colors.text,
  },

  foto_perfil_url: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.accent,
    resizeMode: "cover",
    alignSelf: "center",
  },

  nome_completo: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },

  alterarSenha: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    justifyContent: "space-between",
    paddingVertical: 17,
  },

  secao: {
    fontSize: 12,
    // fontWeight: "bold",
    color: colors.text,
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
    color: colors.text,
  },

  options: {
    width: "100%",
    height: 46,
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
