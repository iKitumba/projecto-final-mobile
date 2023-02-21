import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Image,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

import * as ImagePicker from "expo-image-picker";

import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";

import { API } from "../../services/api";

import { useToken } from "../../utils/useToken";
import { colors } from "../../theme/colors";

export default function CriarAluno() {
  const navigation = useNavigation();
  const [isFemale, setIsFemale] = useState(true);
  const [resultOfImagePicker, setResultOfImagePicker] = useState(null);
  const [imageURI, setImageURI] = useState(null); // "https://github.com/iKitumba.png"
  const [nome_completo, setNome_completo] = useState("");
  const [nome_pai, setNome_pai] = useState("");
  const [nome_mae, setNome_mae] = useState("");
  const [bi, setBi] = useState("");
  const [telefone_1, setTelefone_1] = useState("");
  const [telefone_2, setTelefone_2] = useState("");
  const [endereco, setEndereco] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [hasError, setHasError] = useState(false);
  const [turmas, setTurmas] = useState([]);
  const [turmaId, setTurmaId] = useState("");
  const [fetching, setFetching] = useState(false);
  const submitIsDisabled =
    !resultOfImagePicker ||
    !imageURI ||
    !nome_completo ||
    !nome_pai ||
    !nome_mae ||
    !bi ||
    !telefone_1 ||
    !telefone_2 ||
    !endereco ||
    !nascimento ||
    !turmaId ||
    fetching;

  function handleBack() {
    navigation.goBack();
  }

  function handleGenero() {
    setIsFemale((prev) => !prev);
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
      nome_pai,
      nome_mae,
      bi,
      nascimento,
      endereco,
      telefone_1,
      telefone_2,
      genero,
    }
  ) => {
    const data = new FormData();

    if (hasError) {
      Alert.alert("Erro", "Data inválida");
      return null;
    }

    data.append("foto_perfil", {
      name: photo.uri.substring(photo.uri.lastIndexOf("/") + 1),
      type: `${photo.type}/${photo.uri.substring(
        photo.uri.lastIndexOf(".") + 1
      )}`,
      uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
    });

    data.append("nome_completo", nome_completo);
    data.append("nome_pai", nome_pai);
    data.append("nome_mae", nome_mae);
    data.append("bi", bi);
    data.append("nascimento", nascimento);
    data.append("endereco", endereco);
    data.append("telefone_1", telefone_1);
    data.append("telefone_2", telefone_2);
    data.append("genero", genero);

    return data;
  };

  const formatNascimento = (dataNascimento = "") => {
    const [dia, mes, ano] = dataNascimento.split("-");

    if (!Number(dia) || Number(dia) < 1 || Number(dia) > 31) {
      Alert.alert("Erro", "Dia inválido");
      setHasError(true);
      return new Error("Data inválida");
    }

    if (!Number(mes) || Number(mes) < 1 || Number(mes) > 12) {
      Alert.alert("Erro", "Mês inválido");
      setHasError(true);
      return new Error("Data inválida");
    }

    if (
      !Number(ano) ||
      Number(ano) < 1975 ||
      Number(ano) > new Date().getFullYear()
    ) {
      Alert.alert("Erro", "Ano inválido");
      setHasError(true);
      return new Error("Data inválida");
    }

    setHasError(false);
    return new Date(`${ano}-${mes}-${dia}`).toISOString();
  };

  async function handleUpload() {
    setFetching(true);
    const token = await useToken();

    const formData = createFormData(resultOfImagePicker, {
      nome_completo,
      nome_pai,
      nome_mae,
      bi,
      nascimento: formatNascimento(nascimento),
      endereco,
      telefone_1,
      telefone_2,
      genero: isFemale ? "F" : "M",
    });

    try {
      const { data } = await API.post(`turmas/${turmaId}/alunos`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      });

      Alert.alert("Sucesso", "Aluno criado com sucesso!");

      navigation.navigate("TurmaRoutes");
    } catch (error) {
      return Alert.alert("Erro", error.response?.data.message);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    async function loadAllTurmas() {
      const { data } = await API.get("turmas");
      setTurmas(data.turmas);
    }

    loadAllTurmas();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.goBack} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
            <Text style={styles.topOpctionName}>Aluno</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.form}>
        <KeyboardAvoidingView
          enabled={Platform.OS === "ios"}
          behavior="padding"
          style={{ flex: 1 }}
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
                placeholderTextColor="rgba(115, 134, 155, .4)"
                style={styles.input}
                autoCapitalize="words"
                value={nome_completo}
                onChangeText={setNome_completo}
              />
            </View>
            <TouchableOpacity
              onPress={handleGenero}
              style={[
                styles.genero,
                {
                  backgroundColor: isFemale ? colors.completary : "#F5FAFF",
                  marginRight: 8,
                },
              ]}
            >
              <Text
                style={[
                  styles.generoText,
                  { color: isFemale ? "#F5FAFF" : "#73869B" },
                ]}
              >
                F
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGenero}
              style={[
                styles.genero,
                { backgroundColor: !isFemale ? colors.completary : "#F5FAFF" },
              ]}
            >
              <Text
                style={[
                  styles.generoText,
                  { color: !isFemale ? "#F5FAFF" : "#73869B" },
                ]}
              >
                M
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.secondRow}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Filho de</Text>
              <TextInput
                placeholder="Nome do pai"
                placeholderTextColor="rgba(115, 134, 155, .4)"
                style={styles.input}
                autoCapitalize="words"
                value={nome_pai}
                onChangeText={setNome_pai}
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.label}>E de</Text>
              <TextInput
                placeholder="Nome da mãe"
                placeholderTextColor="rgba(115, 134, 155, .4)"
                style={styles.input}
                autoCapitalize="words"
                value={nome_mae}
                onChangeText={setNome_mae}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nasceu aos</Text>
            <TextInput
              placeholder="dia-mês-ano"
              placeholderTextColor="rgba(115, 134, 155, .4)"
              style={styles.input}
              value={nascimento}
              keyboardType="numeric"
              onChangeText={setNascimento}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Endereço</Text>
            <TextInput
              placeholder="bairro, munincipio, provincia"
              autoCapitalize="words"
              placeholderTextColor="rgba(115, 134, 155, .4)"
              style={styles.input}
              value={endereco}
              onChangeText={setEndereco}
            />
          </View>

          <View style={styles.secondRow}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Nº Telefone 1</Text>
              <TextInput
                placeholder="Do Encarregado"
                placeholderTextColor="rgba(115, 134, 155, .4)"
                style={styles.input}
                keyboardType="phone-pad"
                value={telefone_1}
                onChangeText={setTelefone_1}
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.label}>Nº Telefone 2</Text>
              <TextInput
                placeholder="Seu número"
                placeholderTextColor="rgba(115, 134, 155, .4)"
                style={styles.input}
                keyboardType="phone-pad"
                value={telefone_2}
                onChangeText={setTelefone_2}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>bi</Text>
            <TextInput
              placeholder="Bilhete De Identidade"
              placeholderTextColor="rgba(115, 134, 155, .4)"
              style={styles.input}
              maxLength={14}
              value={bi}
              onChangeText={setBi}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Turma</Text>
            <SelectDropdown
              data={turmas}
              defaultButtonText="Escolha a turma"
              rowTextStyle={styles.dropDownInputText}
              dropdownStyle={{ color: "#73869B" }}
              renderDropdownIcon={() => (
                <MaterialIcons
                  name="arrow-drop-down"
                  size={24}
                  color="rgba(115, 134, 155, .4)"
                />
              )}
              buttonStyle={styles.input}
              buttonTextStyle={styles.dropDownInputText}
              onSelect={(selectedItem, index) => {
                setTurmaId(selectedItem.id);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return `${selectedItem.curso.diminuitivo} ${selectedItem.classe} ${selectedItem.letra} ${selectedItem.turno}`;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return `${item.curso.diminuitivo} ${item.classe} ${item.letra} ${item.turno}`;
              }}
            />
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.button}
              disabled={submitIsDisabled}
              onPress={handleUpload}
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
      </ScrollView>
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
    marginTop: 24,
    paddingBottom: 24,
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

  firstRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  genero: {
    width: 46,
    height: 46,
    backgroundColor: "#F5FAFF",
    borderWidth: 1,
    borderColor: "#BAC5D1",
    alignSelf: "center",
    borderRadius: 4,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  generoText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#73869B",
  },

  secondRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  previewContainer: {
    width: 154,
    height: 154,
    backgroundColor: "#F5FAFF",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#BAC5D1",
    borderRadius: 8,
    marginVertical: 12,
  },

  dropDownInputText: {
    fontSize: 16,
    color: "rgba(115, 134, 155, .4)",
  },

  dropDown: {
    width: "100%",
    borderWidth: 1,
    backgroundColor: "#F5FAFF",
    paddingHorizontal: 12,
    borderColor: "rgba(97, 118, 141, 0.4)",
    borderRadius: 4,
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
