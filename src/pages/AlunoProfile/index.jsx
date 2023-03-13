import { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native-expo-image-cache";

import NotasDisciplina from "../../components/NotasDisciplina";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";

import { useToken } from "../../utils/useToken";
import { API } from "../../services/api";
import Loading from "../../components/Loading";
import { colors } from "../../theme/colors";
import { handleCall } from "../../utils/handleCall";
import { formatPeriodo } from "../../utils/formatPeriodo";
import { TitleWithOrnament } from "../../components/TitleWithOrnament";

export default function AlunoPerfil() {
  const [loading, setLoading] = useState(true);
  const [aluno, setAluno] = useState(null);
  const [notas, setNotas] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { aluno_id, aproveitamento } = route.params;
  const { usuario } = useContext(AuthContext);

  function handleNavigateToProfessores({ turma_id, curso, turno, turma }) {
    navigation.navigate("Professores", { turma_id, curso, turno, turma });
  }

  function handleNavigateToImprimir({ notas, aluno }) {
    if (!notas.length) {
      return null;
    }
    navigation.navigate("Imprimir", { notas, aluno });
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleNavigateToAddNotas({
    id,
    disciplina,
    nota_1,
    nota_2,
    nota_3,
    trimestre,
    media,
  }) {
    navigation.navigate("AddNotas", {
      id,
      disciplina,
      nota_1,
      nota_2,
      nota_3,
      trimestre,
      media,
    });
  }

  function handleDeleteAluno() {
    async function deleteAluno() {
      const token = await useToken();

      try {
        setLoading(true);
        const { data } = await API.delete(`alunos/${aluno_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Alert.alert("Sucesso", data.message);
        navigation.navigate("Home");
      } catch (error) {
        return Alert.alert("Erro", error.response?.data.message);
      } finally {
        setLoading(false);
      }
    }

    Alert.alert(
      "Eliminar",
      `Tem certeza que deseja eliminar o(a) aluno(a) ${aluno.nome_completo}?`,
      [
        {
          text: "Sim",
          onPress: deleteAluno,
          style: "destructive",
        },
        {
          text: "Não",
          style: "cancel",
        },
      ]
    );
  }

  useEffect(() => {
    async function loadInicialData() {
      const token = await useToken();

      try {
        const {
          data: { aluno, notas },
        } = await API.get(`alunos/${aluno_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // const { primeiro_timestre, segundo_trimestre, terceiro_trimestre } = notas;

        setAluno(aluno);
        setNotas(notas);
      } catch (error) {
        return Alert.alert("Erro", error.response?.data.message);
      } finally {
        setLoading(false);
      }
    }

    loadInicialData();
  }, [aluno_id, aproveitamento]);

  return loading ? (
    <Loading />
  ) : (
    <ScrollView style={styles.wrapper}>
      <LinearGradient
        // style={styles.gradient}
        end={{ x: 0, y: 1 }}
        colors={[colors.accent, colors.primary]}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBack}
            style={{ position: "absolute", top: 48, left: 24 }}
          >
            <Ionicons
              name="arrow-back"
              // style={{ position: "relative", top: 48, left: 24 }}
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>

          <Image
            uri={aluno?.foto_perfil_url}
            // source={{ uri: aluno?.foto_perfil_url }}
            resizeMode="contain"
            style={styles.profileImg}
          />
          {usuario.tipo_usuario === "ADMIN" ||
          usuario.tipo_usuario === "PROFESSOR_ADMIN" ? (
            <TouchableOpacity
              onPress={handleDeleteAluno}
              style={{ position: "absolute", top: 48, right: 24 }}
            >
              <Ionicons
                name="trash-bin-outline"
                // style={{ position: "relative", top: 48, left: 24 }}
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </LinearGradient>
      <ScrollView style={styles.container}>
        <Text style={styles.nomeAluno} numberOfLines={1}>
          {aluno?.nome_completo}
        </Text>
        <Text style={styles.descricaoAluno} numberOfLines={3}>
          Frequenta a {aluno?.turma.classe} classe, turma {aluno?.turma.letra}{" "}
          no curso de {aluno?.turma.curso.titulo} no período da{" "}
          {formatPeriodo({ periodo: aluno?.turma.turno })}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.contactarbutton}
            onPress={() =>
              handleNavigateToProfessores({
                turma_id: aluno?.turma_id,
                curso: aluno?.turma.curso,
                turno: aluno?.turma.turno,
                turma: aluno?.turma,
              })
            }
          >
            <Text style={styles.contactarButtonText}>Professores</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleCall({ telefone: aluno.telefone_1 })}
          >
            <Ionicons name="call-outline" size={24} color={colors.accent} />
          </TouchableOpacity>
        </View>
        <TitleWithOrnament
          text={`${Number(aproveitamento)}% de Aproveitamento`}
          stylesOrnament={{
            backgroundColor:
              Number(aproveitamento) > 49 && Number(aproveitamento) < 80
                ? colors.yellow
                : Number(aproveitamento) > 79
                ? colors.green
                : colors.danger,
          }}
          stylesContainer={{ marginTop: 12 }}
        />
      </ScrollView>
      <FlatList
        data={notas && Object.keys(notas)}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <View style={styles.boletimWrapper}>
            <View style={styles.boletimHeader}>
              <Text style={styles.boletimTrimestreText}>
                {notas[item][0]?.trimestre} TRIMESTRE
              </Text>
              <TouchableOpacity
                style={styles.boletimPrint}
                onPress={() =>
                  notas &&
                  handleNavigateToImprimir({ notas: notas[item], aluno })
                }
              >
                <Ionicons name="print" size={24} color={colors.completary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.boletimContainer}>
              <View style={styles.row}>
                <Text style={styles.boletimContentHeaderText}>Disciplina</Text>
                <Text style={styles.boletimContentHeaderText}>
                  (MAC, NPP, PT, MT)
                </Text>
              </View>

              <View style={styles.notaDisciplinaContainer}>
                {notas[item].map(
                  ({
                    id,
                    disciplina,
                    nota_1,
                    nota_2,
                    nota_3,
                    trimestre,
                    media,
                  }) => (
                    <NotasDisciplina
                      key={disciplina.diminuitivo}
                      disciplina={disciplina.titulo}
                      diminuitivo={disciplina.diminuitivo}
                      nota1={Number(nota_1)}
                      nota2={Number(nota_2)}
                      nota3={Number(nota_3)}
                      handleNavigateToAddNotas={() =>
                        handleNavigateToAddNotas({
                          id,
                          disciplina,
                          nota_1: Number(nota_1),
                          nota_2: Number(nota_2),
                          nota_3: Number(nota_3),
                          media,
                          trimestre,
                        })
                      }
                    />
                  )
                )}
              </View>
            </ScrollView>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
  },
  header: {
    width: "100%",
    height: 250,
    // backgroundColor: "#CFCFCF",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
  },

  // gradient: {
  //   width: "100%",
  //   height: 250,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   paddingHorizontal: 24,
  //   borderRadius: 4,
  // },

  profileImg: {
    width: 154,
    height: 154,
    borderRadius: 12,
  },

  nomeAluno: {
    textAlign: "center",
    // marginTop: 12,
    color: colors.text,
    fontSize: 20,
    fontWeight: "bold",
  },
  descricaoAluno: {
    textAlign: "center",
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  contactarbutton: {
    backgroundColor: colors.accent,
    flex: 1,
    borderRadius: 4,
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    marginRight: 12,
  },
  contactarButtonText: {
    fontSize: 18,
    textTransform: "uppercase",
    color: colors.primary,
  },
  editButton: {
    width: 46,
    height: 46,
    backgroundColor: "rgba(9, 127, 250, .15)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  boletimWrapper: {
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 30,
    borderColor: colors.border,
    borderWidth: 1,
    minWidth: 310,
  },
  boletimHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  boletimTrimestreText: {
    fontSize: 14,
    textTransform: "uppercase",
    color: colors.text,
  },
  boletimPrint: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderColor: colors.border,
    borderWidth: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  boletimContainer: {},
  row: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    justifyContent: "space-between",
    paddingRight: 12,
    paddingVertical: 12,
    alignContent: "stretch",
  },
  boletimContentHeaderText: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 16,
  },
  boletimContentText: {
    borderRightColor: colors.text,
    color: colors.text,
    borderRightWidth: 1,
    paddingHorizontal: 4,
  },
  notaDisciplinaContainer: {},
});
