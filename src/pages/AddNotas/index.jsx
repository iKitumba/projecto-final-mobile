import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API } from "../../services/api";
import { useToken } from "../../utils/useToken";
import { colors } from "../../theme/colors";

export default function AddNotas() {
  const navigation = useNavigation();
  const route = useRoute();
  const { disciplina, nota_1, nota_2, nota_3, trimestre, id } = route.params;
  const [nota1, setNota1] = useState(nota_1);
  const [nota2, setNota2] = useState(nota_2);
  const [nota3, setNota3] = useState(nota_3);
  const [fetching, setFetching] = useState(false);
  const media = Math.round((nota1 + nota2 + nota3) / 3);

  function handleBack() {
    navigation.goBack();
  }

  async function handleUpdateNotas() {
    const token = await useToken();

    try {
      setFetching(true);
      const { data } = await API.patch(
        `notas/${id}`,
        { nota_1: nota1, nota_2: nota2, nota_3: nota3 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Sucesso", data.message);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", error.response?.data.message);
    } finally {
      setFetching(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.goBack} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
            <Text style={styles.topOpctionName}>{trimestre} trimestre</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Disciplina</Text>
          <TextInput
            placeholder="Titulo da disciplina"
            placeholderTextColor="rgba(115, 134, 155, .4)"
            style={styles.input}
            value={disciplina.titulo}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Notas</Text>
          <View style={styles.inputNotasContainer}>
            <TextInput
              value={nota1}
              defaultValue={nota1}
              placeholder="MAC"
              onChangeText={(text) => setNota1(Number.parseInt(text))}
              style={styles.input}
              placeholderTextColor="rgba(115, 134, 155, .4)"
              keyboardType="numeric"
              maxLength={2}
            />
            <TextInput
              value={nota2}
              defaultValue={nota2}
              placeholder="NPP"
              style={styles.input}
              placeholderTextColor="rgba(115, 134, 155, .4)"
              onChangeText={(text) => setNota2(Number.parseInt(text))}
              keyboardType="numeric"
              maxLength={2}
            />
            <TextInput
              value={nota3}
              defaultValue={nota3}
              placeholder="PT"
              style={styles.input}
              placeholderTextColor="rgba(115, 134, 155, .4)"
              onChangeText={(text) => setNota3(Number.parseInt(text))}
              keyboardType="numeric"
              maxLength={2}
            />
            <TouchableOpacity style={styles.mediaContainer}>
              <Text style={styles.mediaText}>
                {isNaN(media) ? "..." : media}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            disabled={fetching}
            onPress={handleUpdateNotas}
          >
            <Text style={styles.buttonText}>
              {fetching ? "Salvando..." : "Salvar"}
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
    paddingVertical: 24,
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
    flex: 1,
    marginRight: 12,
    borderWidth: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    borderColor: "rgba(97, 118, 141, 0.4)",
    borderRadius: 4,
  },

  inputNotasContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "space-between",
  },

  mediaContainer: {
    height: 46,
    width: 46,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(97, 118, 141, 0.4)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.completary,
  },

  mediaText: {
    color: colors.white,
    fontSize: 16,
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
});
