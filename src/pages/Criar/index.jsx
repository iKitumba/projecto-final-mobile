import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import novoAlunoIcon from "../../assets/novo-aluno.png";
import novoCursoIcon from "../../assets/novo-curso.png";
import novaTurmaIcon from "../../assets/nova-turma.png";
import novaDisciplinaIcon from "../../assets/nova-disciplina.png";
import novoUsuarioIcon from "../../assets/novo-usuario.png";
import novoCominicadoIcon from "../../assets/novo-comunicado.png";
import novaAssociacaoPDTIcon from "../../assets/nova-associacao-pdt.png";

import { criarOptions } from "../../constants/criarOptions";
import { colors } from "../../theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Criar() {
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleOptionPress(routeName) {
    navigation.navigate(routeName);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.goBack} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
            <Text style={styles.topOpctionName}>Criar</Text>
          </TouchableOpacity>
        </View>
      </View> */}

      <ScrollView
        style={styles.criarOptionsContainer}
        contentContainerStyle={{ marginTop: 0, paddingTop: 0 }}
      >
        <View style={styles.criarOptionRow}>
          <TouchableOpacity
            style={styles.criarOption}
            onPress={() => handleOptionPress(criarOptions[0].routeName)}
          >
            <Image source={novoAlunoIcon} />
            <Text style={styles.criarOptionTitle} numberOfLines={1}>
              {criarOptions[0].title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.criarOption}
            onPress={() => handleOptionPress(criarOptions[1].routeName)}
          >
            <Image source={novoCursoIcon} />
            <Text style={styles.criarOptionTitle} numberOfLines={1}>
              {criarOptions[1].title}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.criarOptionRow}>
          <TouchableOpacity
            style={styles.criarOption}
            onPress={() => handleOptionPress(criarOptions[2].routeName)}
          >
            <Image source={novaTurmaIcon} />
            <Text style={styles.criarOptionTitle} numberOfLines={1}>
              {criarOptions[2].title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.criarOption}
            onPress={() => handleOptionPress(criarOptions[3].routeName)}
          >
            <Image source={novaDisciplinaIcon} />
            <Text style={styles.criarOptionTitle} numberOfLines={1}>
              {criarOptions[3].title}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.criarOptionRow}>
          <TouchableOpacity
            style={styles.criarOption}
            onPress={() => handleOptionPress(criarOptions[4].routeName)}
          >
            <Image source={novoUsuarioIcon} />
            <Text style={styles.criarOptionTitle} numberOfLines={1}>
              {criarOptions[4].title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.criarOption}
            onPress={() => handleOptionPress(criarOptions[5].routeName)}
          >
            <Image source={novoCominicadoIcon} />
            <Text style={styles.criarOptionTitle} numberOfLines={1}>
              {criarOptions[5].title}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.criarOptionRow}>
          <TouchableOpacity
            style={styles.criarOption}
            onPress={() => handleOptionPress(criarOptions[6].routeName)}
          >
            <Image source={novaAssociacaoPDTIcon} />
            <Text style={styles.criarOptionTitle} numberOfLines={1}>
              {criarOptions[6].title}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <Title text="O que pretendes criar?" />

        <FlatList
          data={criarOptions}
          style={styles.optionsContainer}
          keyExtractor={(item, index) => item.title}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => handleOptionPress(item.routeName)}
            >
              <Text style={styles.optionText}>{item.title}</Text>
              <MaterialIcons
                name="arrow-right"
                size={24}
                color={colors.completary}
              />
            </TouchableOpacity>
          )}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
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
    // textTransform: "uppercase",
  },

  criarOptionsContainer: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 12,
    paddingBottom: 100,
  },

  criarOptionRow: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    marginBottom: 12,
  },
  criarOption: {
    flex: 1,
    height: 136,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginLeft: 6,
    marginRight: 6,
  },

  criarOptionTitle: {
    marginTop: 12,
    fontSize: 16,
    color: colors.text,
  },

  optionsContainer: {
    marginHorizontal: 24,
    marginVertical: 24,
  },

  optionContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    textTransform: "uppercase",
    color: colors.text,
  },
});
