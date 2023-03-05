import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Title from "../../components/Title";

import { criarOptions } from "../../constants/criarOptions";
import { colors } from "../../theme/colors";

export default function Criar() {
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleOptionPress(routeName) {
    navigation.navigate(routeName);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.goBack} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
            <Text style={styles.topOpctionName}>Criar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {/* <Title text="O que pretendes criar?" /> */}

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
        />
      </View>
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
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 20,
    textTransform: "uppercase",
    color: colors.text,
  },
});
