import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "./Button";
import { useToken } from "../utils/useToken";
import { Image } from "react-native-expo-image-cache";

import { API } from "../services/api";
import { handleCall } from "../utils/handleCall";

import { colors } from "../theme/colors";

export default function Aluno({
  nome_completo,
  foto_perfil,
  id,
  telefone_1,
  telefone_2,
}) {
  const navigation = useNavigation();
  const [aproveitamento, setAproveitamento] = useState(0);

  function handleSaberMais() {
    navigation.navigate("AlunoPerfil", { aluno_id: id, aproveitamento });
  }

  useEffect(() => {
    async function loadAproveitamento() {
      const token = await useToken();

      try {
        const { data } = await API.get(`alunos/${id}/aproveitamento`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAproveitamento(data.aproveitamento);
      } catch (error) {
        return Alert.alert("Erro", error.response?.data.message);
      }
    }

    loadAproveitamento();
  }, [id]);

  return (
    <View style={styles.container}>
      <Image
        uri={foto_perfil}
        // source={{ uri: foto_perfil }}
        resizeMode="contain"
        style={styles.profilePic}
      />
      <View style={styles.rightSide}>
        <Text style={styles.nomeAluno} numberOfLines={1}>
          {nome_completo}
        </Text>
        <View style={styles.progresses}>
          <View style={styles.progress} />
          <View
            style={[
              styles.progress2,
              { width: aproveitamento && `${aproveitamento}%` },
            ]}
          />
        </View>
        <View style={styles.actions}>
          <Button
            text="Contactar"
            onPress={() => handleCall({ telefone: telefone_1 })}
            stylesContainer={{ marginRight: 12 }}
          />
          <Button text="Saber mais" onPress={handleSaberMais} outlined={true} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 96,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#F5FAFF",
    borderRadius: 8,
    paddingHorizontal: 7,
  },
  profilePic: {
    flex: 1,
    height: 82,
    borderRadius: 6,
  },
  rightSide: {
    paddingHorizontal: 12,
    flex: 3,
    justifyContent: "space-between",
  },
  nomeAluno: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  progresses: {
    position: "relative",
  },
  progress: {
    width: "100%",
    height: 8,
    backgroundColor: colors.accentLowOpacity,
    borderRadius: 4,
  },
  progress2: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    zIndex: 11,
  },
  actions: {
    flexDirection: "row",
    marginTop: 24,
  },
});
