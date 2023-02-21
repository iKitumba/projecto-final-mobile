import { useState, useEffect } from "react";
import { View, StyleSheet, Alert, FlatList } from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

import Title from "../../components/Title";
import Professor from "../../components/Professor";
import { API } from "../../services/api";
import { colors } from "../../theme/colors";

import Loading from "../../components/Loading";
import { useToken } from "../../utils/useToken";

export default function AllProfessores() {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [professsores, setProfessores] = useState([]);

  function navigateToTurma() {
    navigation.navigate("Turma");
  }

  useEffect(() => {
    async function loadAllProfessores() {
      const token = await useToken();

      try {
        const { data } = await API.get("professores", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfessores(data.professores);
      } catch (error) {
        Alert.alert("Erro", error.response?.data.message);
      } finally {
        setLoading(false);
      }
    }

    loadAllProfessores();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profContainer}>
        {/* <View style={styles.profHeader}>
            <Text style={styles.thead}>Professor</Text>
            <Text style={[styles.thead, { textAlign: "right" }]}>
              Telefonar
            </Text>
          </View> */}
        <Title
          text="Todos os Professores"
          stylesContainer={{ marginTop: 12 }}
        />
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={professsores}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <Professor
                  nome_completo={item.nome_completo}
                  telefone={item.telefone}
                />
              );
            }}
          />
        )}
        {/* <View style={styles.profContent}>
          {[0, 1, 2, 3, 4, 5, 6, 8, 9, 10].map((prof) => (
            <Professor key={prof} />
          ))}
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 24,
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  profContainer: {
    marginBottom: 70,
  },
  profHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  thead: {
    textTransform: "uppercase",
    fontSize: 16,
    color: colors.text,
    flex: 1,
    paddingHorizontal: 4,
  },
});
