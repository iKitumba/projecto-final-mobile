import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";

import SelectDropdown from "react-native-select-dropdown";
import { cargos } from "../../constants/cargos";

import * as ImagePicker from "expo-image-picker";
import { useToken } from "../../utils/useToken";
import { API } from "../../services/api";
import { colors } from "../../theme/colors";

export default function CriarUsuario() {
  const navigation = useNavigation();
  const [imageURI, setImageURI] = useState(null);
  const [resultOfImagePicker, setResultOfImagePicker] = useState(null);
  const [nome_completo, setNome_completo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [bi, setBi] = useState("");
  const [tipo_usuario, setTipo_usuario] = useState("");
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [endereco, setEndereco] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [isFemale, setIsFemale] = useState(true);
  const [fetching, setFetching] = useState(false);
  const submitIsDisabled =
    !resultOfImagePicker ||
    !imageURI ||
    !nome_completo ||
    !username ||
    !senha ||
    !bi ||
    !telefone ||
    !endereco ||
    !nascimento ||
    !turmaId ||
    fetching;

  function handleGenero() {
    setIsFemale((prev) => !prev);
  }

  function handleBack() {
    navigation.goBack();
  }

  async function pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setResultOfImagePicker(result);

    if (!result.cancelled) {
      setImageURI(result.uri);
    }
  }

  const createFormData = (
    photo,
    {
      nome_completo,
      bi,
      tipo_usuario,
      endereco,
      telefone,
      genero,
      username,
      senha,
    }
  ) => {
    const data = new FormData();

    // if (hasError) {
    //   Alert.alert("Criar usuário", "Data inválida");
    //   return null;
    // }

    data.append("foto_perfil", {
      name: photo.uri.substring(photo.uri.lastIndexOf("/") + 1),
      type: `${photo.type}/${photo.uri.substring(
        photo.uri.lastIndexOf(".") + 1
      )}`,
      uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
    });

    data.append("nome_completo", nome_completo);
    data.append("genero", genero);
    data.append("telefone", telefone);
    data.append("bi", bi);
    data.append("endereco", endereco);
    data.append("username", username);
    data.append("senha", senha);
    data.append("tipo_usuario", tipo_usuario);

    return data;
  };

  async function handleSubmit() {
    const token = await useToken();

    const formData = createFormData(resultOfImagePicker, {
      nome_completo,
      telefone,
      bi,
      endereco,
      username,
      senha,
      genero: isFemale ? "F" : "M",
      tipo_usuario,
    });

    try {
      setFetching(true);
      const { data } = await API.post(`usuarios`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      });

      Alert.alert("Criar Usuário", "Usuário criado com sucesso!");

      navigation.navigate("TurmaRoutes");
    } catch (error) {
      return Alert.alert("Criar usuário", error.response?.data.message);
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
            <Text style={styles.topOpctionName}>Usuário</Text>
          </TouchableOpacity>
        </View>
      </View> */}

      <ScrollView style={styles.form}>
        <KeyboardAvoidingView
          enabled={Platform.OS === "ios"}
          behavior="padding"
        >
          {imageURI ? (
            <TouchableOpacity onPress={pickImage}>
              <Image
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                  marginVertical: 12,
                  borderRadius: 8,
                }}
                source={{
                  uri: imageURI,
                  width: 154,
                  height: 154,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.previewContainer}
              onPress={pickImage}
            >
              <MaterialIcons
                name="photo-camera"
                size={36}
                color={colors.primary}
              />
            </TouchableOpacity>
          )}

          <View style={styles.firstRow}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                placeholder="Nome completo do aluno"
                placeholderTextColor={colors.border}
                style={styles.input}
                value={nome_completo}
                onChangeText={setNome_completo}
                autoCapitalize="words"
              />
            </View>
            <TouchableOpacity
              onPress={handleGenero}
              style={[
                styles.genero,
                {
                  backgroundColor: isFemale ? colors.completary : colors.white,
                  marginRight: 8,
                },
              ]}
            >
              <Text
                style={[
                  styles.generoText,
                  { color: isFemale ? colors.white : colors.text },
                ]}
              >
                F
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGenero}
              style={[
                styles.genero,
                {
                  backgroundColor: !isFemale ? colors.completary : colors.white,
                },
              ]}
            >
              <Text
                style={[
                  styles.generoText,
                  { color: !isFemale ? colors.white : colors.text },
                ]}
              >
                M
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.secondRow}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Telefone</Text>
              <TextInput
                placeholder="999999999"
                placeholderTextColor={colors.border}
                style={styles.input}
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.label}>Bi</Text>
              <TextInput
                placeholder="Bilhete de identidade"
                placeholderTextColor={colors.border}
                style={styles.input}
                value={bi}
                onChangeText={setBi}
                autoCapitalize="none"
                maxLength={14}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Endereço</Text>
            <TextInput
              placeholder="bairro, munincipio, provincia"
              placeholderTextColor={colors.border}
              style={styles.input}
              value={endereco}
              onChangeText={setEndereco}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.secondRow}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                placeholder="Nome de usuário"
                placeholderTextColor={colors.border}
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={20}
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <TouchableOpacity
                onPress={() => {
                  setPasswordHidden(!passwordHidden);
                }}
              >
                <Text style={styles.label}>
                  Senha({passwordHidden ? "mostrar" : "esconder"})
                </Text>
              </TouchableOpacity>
              <TextInput
                placeholder="Digite uma senha"
                placeholderTextColor={colors.border}
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={passwordHidden}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Cargo</Text>
            <SelectDropdown
              data={cargos}
              statusBarTranslucent={true}
              defaultButtonText="Escolha o cargo do usuário"
              rowTextStyle={{ color: colors.text, fontSize: 16 }}
              rowStyle={styles.dropDownRow}
              buttonTextStyle={styles.dropDownInputText}
              dropdownStyle={{ flex: 1 }}
              renderDropdownIcon={() => (
                <MaterialIcons
                  name="arrow-drop-down"
                  size={24}
                  color={colors.border}
                />
              )}
              buttonStyle={styles.input}
              onSelect={(selectedItem, index) => {
                setTipo_usuario(selectedItem.id);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item.name;
              }}
            />
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.button}
              disabled={submitIsDisabled}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>
                {fetching ? "Cadastrando..." : "Cadastrar"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleBack}
              style={[styles.button, { backgroundColor: colors.danger }]}
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
  },
  header: {
    paddingHorizontal: 24,
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

  form: {
    // marginTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 24,
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
    width: "100%",
  },

  firstRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  genero: {
    width: 46,
    height: 46,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: "center",
    borderRadius: 4,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  generoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },

  secondRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  previewContainer: {
    width: 154,
    height: 154,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border,
    borderRadius: 8,
    marginVertical: 12,
  },

  dropDownInputText: {
    fontSize: 16,
    color: colors.border,
  },

  dropDown: {
    width: "100%",
    borderWidth: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    borderColor: colors.border,
    borderRadius: 4,
  },

  dropDownRow: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  actions: {
    flexDirection: "row",
    marginVertical: 46,
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
