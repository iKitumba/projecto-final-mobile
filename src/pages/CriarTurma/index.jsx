import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import SelectDropdown from "react-native-select-dropdown";
import { letras } from "../../constants/letras";
import { classes } from "../../constants/classes";
import { API } from "../../services/api";
import { periodos } from "../../constants/periodo";
import { colors } from "../../theme/colors";

export default function CriarTurma() {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(1);
  const [cursos, setCursos] = useState([]);
  const [cursoId, setCursoId] = useState("");
  const [classe, setClasse] = useState();
  const [turno, setTurno] = useState("");
  const [letra, setLetra] = useState("");
  const [fetching, setFetching] = useState(false);

  function handleBack() {
    navigation.goBack();
  }

  async function handleSubmit() {
    const token = await AsyncStorage.getItem("@PAP:token");

    if (!cursoId) {
      return Alert.alert("Alerta", "Seleciona um curso");
    }

    if (!classe) {
      return Alert.alert("Alerta", "Seleciona uma classe");
    }

    if (!turno) {
      return Alert.alert("Alerta", "Seleciona um período");
    }

    if (!letra) {
      return Alert.alert("Alerta", "Seleciona uma letra identificadora");
    }

    try {
      setFetching(true);
      const { data } = await API.post(
        `cursos/${cursoId}/turmas`,
        {
          letra,
          turno,
          classe,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Sucesso", "Turma criada com sucesso!");

      navigation.navigate("TurmaRoutes");
    } catch (error) {
      return Alert.alert("Erro", error.response.data.message);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    async function loadAllCursos() {
      const { data } = await API.get("cursos");

      setCursos(data.cursos);
    }

    loadAllCursos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.goBack} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
            <Text style={styles.topOpctionName}>Turma</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Curso</Text>
          <SelectDropdown
            data={cursos}
            defaultButtonText="Seleciona o curso"
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
              setCursoId(selectedItem.id);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem.diminuitivo;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item.titulo;
            }}
          />
        </View>

        <View style={styles.checkboxWrapper}>
          {classes.map((classe) => (
            <View key={classe.id} style={styles.checkboxContainer}>
              <Checkbox
                style={styles.checkbox}
                value={checked === classe.id}
                onValueChange={() => {
                  setChecked(classe.id);
                  setClasse(classe.title);
                }}
                color={checked === classe.id ? colors.completary : undefined}
              />
              <Text style={styles.checkboxText}>{classe.title}</Text>
            </View>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Período</Text>
          <SelectDropdown
            data={periodos}
            defaultButtonText="Período de aulas"
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
              setTurno(selectedItem.id);
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

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Indentificador</Text>
          <SelectDropdown
            data={letras}
            defaultButtonText="Letra identificadora"
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
              setLetra(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            disabled={!cursoId || !classe || !turno || !letra || fetching}
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
    width: "100%",
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

  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    borderColor: "#73869B",
  },
  checkboxText: {
    marginLeft: 8,
    color: "#73869B",
  },
});
