import { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

import Title from "../../components/Title";
import NotasDisciplina from "../../components/NotasDisciplina";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../../contexts/AuthContext";
import { useToken } from "../../utils/useToken";
import { API } from "../../services/api";
import Loading from "../../components/Loading";
import { colors } from "../../theme/colors";
import { formatPeriodo } from "../../utils/formatPeriodo";
import { TitleWithOrnament } from "../../components/TitleWithOrnament";

export default function Aluno() {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { usuario } = useContext(AuthContext);
  const [aluno, setAluno] = useState(null);
  const [notas, setNotas] = useState(null);
  const [aproveitamento, setAproveitamento] = useState(0);

  function handleNavigateToProfessores({ turma_id, curso, turno, turma }) {
    navigation.navigate("Professores", { turma_id, curso, turno, turma });
  }

  function handleNavigateToImprimir({ notas, aluno }) {
    if (!notas.length) {
      return null;
    }

    navigation.navigate("Imprimir", { notas, aluno });
  }

  function handleNavigateToAddNotas(
    disciplina,
    nota1,
    nota2,
    nota3,
    trimestre
  ) {
    navigation.navigate("AddNotas", {
      disciplina,
      nota1,
      nota2,
      nota3,
      trimestre,
    });
  }

  useEffect(() => {
    async function loadInicialData() {
      const token = await useToken();

      try {
        const {
          data: { aluno, notas },
        } = await API.get(`alunos/${usuario.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = await API.get(`alunos/${usuario.id}/aproveitamento`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAproveitamento(data.aproveitamento);
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
  }, [usuario.id]);

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
          <Image
            source={{ uri: aluno?.foto_perfil_url }}
            resizeMode="contain"
            style={styles.profileImg}
          />
        </View>
      </LinearGradient>
      <ScrollView style={styles.container}>
        <Text style={styles.nomeAluno}>{aluno?.nome_completo}</Text>
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
                turma_id: usuario.turma_id,
                curso: aluno?.turma.curso,
                turno: aluno?.turma.turno,
                turma: aluno?.turma,
              })
            }
          >
            {/* <Feather name="phone-call" size={24} color=colors.primary /> */}
            <Text style={styles.contactarButtonText}>Professores</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.editButton}>
            <MaterialIcons name="edit" size={24} color={colors.accent} />
          </TouchableOpacity> */}
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
                      handleNavigateToAddNotas={() => {}}
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
  profileImg: {
    width: 154,
    height: 154,
    borderRadius: 12,
  },

  nomeAluno: {
    textAlign: "center",
    // marginTop: 0,
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
    // opacity: 0.5,
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
  },
  contactarButtonText: {
    fontSize: 16,
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
