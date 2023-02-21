import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

import { API } from "../../services/api";

import Search from "../../components/Search";
import Title from "../../components/Title";
import Loading from "../../components/Loading";

import elipseImg from "../../assets/elipse.png";
import { colors } from "../../theme/colors";

export default function Comunicados() {
  const [loading, setLoading] = useState(true);
  const [comunicados, setComunicados] = useState([]);

  useEffect(() => {
    async function loadComunicados() {
      const { data, headers } = await API.get("comunicados");

      setComunicados(data.comunicados);
      setLoading(false);
    }

    loadComunicados();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Search /> */}

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={comunicados}
          ListHeaderComponent={
            <Title
              text="Últimos comunicados"
              stylesContainer={{ marginTop: 24, paddingHorizontal: 24 }}
            />
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          style={styles.comunicadosContainer}
          // contentContainerStyle={styles.comunicadosContainer}
          renderItem={({ item: comunicado, index }) => {
            const date = format(
              new Date(comunicado.created_at),
              "'Aos' d ' De ' MMMM k'h'mm",
              {
                locale: pt,
              }
            );

            return (
              <View style={styles.comunicadoContainer}>
                <View style={styles.comunicadoHeader}>
                  <View style={styles.comunicadoHeaderTop}>
                    <Image source={elipseImg} />
                    <Text style={styles.comunicadoAssunto}>
                      {comunicado.titulo}
                    </Text>
                  </View>
                  <Text style={styles.comunicadoData}>
                    {/* Aos 19 De Novembro 2022 */}
                    {date}
                  </Text>
                </View>
                <Text style={styles.comunicadoContent}>
                  {comunicado.conteudo}
                </Text>
                <View style={styles.separator} />
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 24,
    backgroundColor: colors.primary,
    // paddingHorizontal: 24,
    paddingTop: 24,
  },
  comunicadosContainer: {
    flex: 1,
    paddingBottom: 200,
  },
  comunicadoContainer: {},
  comunicadoHeader: {
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  comunicadoHeaderTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  comunicadoAssunto: {
    fontSize: 20,
    marginLeft: 8,
    flexWrap: "wrap",
    color: colors.text,
    textTransform: "uppercase",
  },
  comunicadoData: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.4,
  },
  comunicadoContent: {
    fontSize: 18,
    color: colors.text,
    lineHeight: 26,
    paddingHorizontal: 24,
  },
  separator: {
    width: "100%",
    height: 8,
    backgroundColor: "#ECF6FF",
    marginVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
