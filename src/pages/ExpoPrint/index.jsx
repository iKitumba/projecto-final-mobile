import * as React from "react";
import {
  View,
  StyleSheet,
  Button,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import Title from "../../components/Title";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useHtmlToPrint } from "../../utils/htmlToPrint";
import { colors } from "../../theme/colors";

export default function ExpoPrint() {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedPrinter, setSelectedPrinter] = React.useState();
  const { notas, aluno } = route.params;
  const html = useHtmlToPrint({ notas, aluno });

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });

    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  function handleBack() {
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.goBack} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
            <Text style={styles.topOpctionName}>Imprimir Arquivo</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.buttonPrint, { backgroundColor: colors.accent }]}
          onPress={print}
        >
          <Text style={styles.buttonPrintText}>Imprimir</Text>
        </TouchableOpacity>
        <View style={styles.spacer} />

        <TouchableOpacity style={styles.buttonPrint} onPress={printToFile}>
          <Text style={styles.buttonPrintText}>Salvar Como PDF</Text>
        </TouchableOpacity>
        {Platform.OS === "ios" && (
          <>
            <View style={styles.spacer} />
            <Button title="Select printer" onPress={selectPrinter} />
            <View style={styles.spacer} />
            {selectedPrinter ? (
              <Text
                style={styles.printer}
              >{`Selected printer: ${selectedPrinter.name}`}</Text>
            ) : undefined}
          </>
        )}
      </View>
    </ScrollView>
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

  buttonsContainer: {
    marginVertical: 24,
  },

  buttonPrint: {
    height: 45,
    backgroundColor: colors.text,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6,
  },

  buttonPrintText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
});
