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
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

import RNDateTimePicker from "@react-native-community/datetimepicker";

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
  const [nascimento, setNascimento] = useState(new Date());
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
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Clique para escolher");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || nascimento;
    setShow(Platform.OS === "ios");
    setNascimento(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    setText(fDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

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

  async function handleUpload() {
    setFetching(true);
    const token = await useToken();

    const formData = createFormData(resultOfImagePicker, {
      nome_completo,
      nome_pai,
      nome_mae,
      bi,
      nascimento: nascimento.toISOString(),
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
      console.log(error);
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
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.goBack} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
            <Text style={styles.topOpctionName}>Aluno</Text>
          </TouchableOpacity>
        </View>
      </View> */}

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
                placeholderTextColor={colors.border}
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
                  { color: !isFemale ? colors.white : "#73869B" },
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
                placeholderTextColor={colors.border}
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
                placeholderTextColor={colors.border}
                style={styles.input}
                autoCapitalize="words"
                value={nome_mae}
                onChangeText={setNome_mae}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nasceu aos</Text>

            <TouchableOpacity
              style={[
                styles.input,
                { alignItems: "center", justifyContent: "center" },
              ]}
              onPress={() => showMode("date")}
            >
              <Text style={{ color: colors.text, fontSize: 16 }}>{text}</Text>
            </TouchableOpacity>
            <View>
              {show && (
                <RNDateTimePicker
                  testID="dateTimePicker"
                  maximumDate={new Date()}
                  value={nascimento}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Endereço</Text>
            <TextInput
              placeholder="bairro, munincipio, provincia"
              autoCapitalize="words"
              placeholderTextColor={colors.border}
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
                placeholderTextColor={colors.border}
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
                placeholderTextColor={colors.border}
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
              placeholderTextColor={colors.border}
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
              rowTextStyle={{ color: colors.text, fontSize: 16 }}
              rowStyle={styles.dropDownRow}
              buttonStyle={styles.buttonStyle}
              buttonTextStyle={styles.dropDownInputText}
              dropdownStyle={{ flex: 1 }}
              statusBarTranslucent={true}
              renderDropdownIcon={() => (
                <MaterialIcons
                  name="arrow-drop-down"
                  size={24}
                  color={colors.border}
                />
              )}
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
              style={[styles.button, { backgroundColor: colors.danger }]}
              onPress={handleBack}
            >
              <Text style={styles.buttonText}>Descartar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              disabled={submitIsDisabled}
              onPress={handleUpload}
            >
              <Text style={styles.buttonText}>
                {fetching ? "Criando..." : "Criar"}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
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

  buttonStyle: {
    width: "100%",
    borderWidth: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    borderColor: colors.border,
    borderRadius: 4,
  },

  dropDown: {
    width: "100%",
    borderWidth: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    borderColor: colors.border,
    borderRadius: 4,
  },

  actions: {
    flexDirection: "row",
    marginVertical: 46,
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropDownRow: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
