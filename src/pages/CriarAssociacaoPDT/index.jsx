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
import { useNavigation } from "@react-navigation/native";

import SelectDropdown from "react-native-select-dropdown";

import { API } from "../../services/api";
import { colors } from "../../theme/colors";
import { useToken } from "../../utils/useToken";

export default function CriarAssociacaoPDT() {
  const navigation = useNavigation();
  const [professores, setProfessores] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [professorId, setProfessorId] = useState("");
  const [turmaId, setTurmaId] = useState("");
  const [disciplinaId, setDisciplinaId] = useState("");
  const [fetching, setFetching] = useState(false);

  function handleBack() {
    navigation.goBack();
  }

  async function handleSubmit() {
    const token = await useToken();

    if (!professorId) {
      return Alert.alert(
        "Alerta",
        "O professor é obrigatório para a associação"
      );
    }

    if (!turmaId) {
      return Alert.alert("Alerta", "A turma é obrigatória para a associação");
    }

    if (!disciplinaId) {
      return Alert.alert(
        "Alerta",
        "A disciplina é obrigatória para a associação"
      );
    }

    try {
      setFetching(true);
      const { data } = await API.post(
        `professores/${professorId}/disciplinas/${disciplinaId}/turmas/${turmaId}`,
        {},
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      Alert.alert(
        "Sucesso",
        "Associação entre Professor, Disciplina e Turma feita com sucesso!"
      );

      navigation.navigate("TurmaRoutes");
    } catch (error) {
      return Alert.alert("Erro", error.response?.data.message);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    async function loadAllInitialData() {
      const token = await useToken();

      try {
        const data = await Promise.all([
          API.get("professores", {
            headers: { authorization: `Bearer ${token}` },
          }),
          API.get("turmas", {
            headers: { authorization: `Bearer ${token}` },
          }),
          API.get("disciplinas", {
            headers: { authorization: `Bearer ${token}` },
          }),
        ]);

        setProfessores(data[0].data.professores);
        setTurmas(data[1].data.turmas);
        setDisciplinas(data[2].data.disciplinas);
      } catch (error) {
        Alert.alert("Erro", "Erro ao buscar dados no servidor");
      }
    }

    loadAllInitialData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.goBack} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
            <Text style={styles.topOpctionName}>Associação PDT</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Professor</Text>
          <SelectDropdown
            rowStyle={styles.dropDownRow}
            data={professores}
            defaultButtonText="Qual desses professores?"
            statusBarTranslucent={true}
            rowTextStyle={styles.dropDownInputText}
            renderDropdownIcon={() => (
              <MaterialIcons
                name="arrow-drop-down"
                size={24}
                color={colors.border}
              />
            )}
            buttonStyle={styles.input}
            buttonTextStyle={styles.dropDownInputText}
            onSelect={(selectedItem, index) => {
              setProfessorId(selectedItem.id);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem.nome_completo;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item.nome_completo;
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Turma</Text>
          <SelectDropdown
            rowStyle={styles.dropDownRow}
            data={turmas}
            defaultButtonText="Qual a turma?"
            statusBarTranslucent={true}
            rowTextStyle={styles.dropDownInputText}
            renderDropdownIcon={() => (
              <MaterialIcons
                name="arrow-drop-down"
                size={24}
                color={colors.border}
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

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Disciplina</Text>
          <SelectDropdown
            rowStyle={styles.dropDownRow}
            data={disciplinas}
            defaultButtonText="Escolha a disciplina"
            rowTextStyle={styles.dropDownInputText}
            statusBarTranslucent={true}
            renderDropdownIcon={() => (
              <MaterialIcons
                name="arrow-drop-down"
                size={24}
                color={colors.border}
              />
            )}
            buttonStyle={styles.input}
            buttonTextStyle={styles.dropDownInputText}
            onSelect={(selectedItem, index) => {
              setDisciplinaId(selectedItem.id);
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

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            disabled={!professorId || !turmaId || !disciplinaId || fetching}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>
              {fetching ? "Associando..." : "Associar"}
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
    fontWeight: "bold",
    color: colors.text,
  },

  form: {
    marginVertical: 24,
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
    width: "100%",
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

  dropDownInputText: {
    fontSize: 16,
    color: colors.text,
  },

  dropDownRow: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  dropDown: {
    width: "100%",
    borderWidth: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    borderColor: colors.border,
    borderRadius: 4,
  },
});
