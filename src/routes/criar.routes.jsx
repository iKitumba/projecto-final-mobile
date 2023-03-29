import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import Criar from "../pages/Criar";
import CriarAluno from "../pages/CriarAluno";
import CriarUsuario from "../pages/CriarUsuario";
import Disciplina from "../pages/Disciplina";
import CriarTurma from "../pages/CriarTurma";
import CriarAssociacaoPDT from "../pages/CriarAssociacaoPDT";
import Curso from "../pages/Curso";
import Comunicado from "../pages/Comunicado";
import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity } from "react-native";

export default function CriarRoutes() {
  const navigation = useNavigation();
  return (
    <Navigator
      screenOptions={{
        headerShown: true,
        // headerBackVisible: false,
        // headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.text,
        headerTitleStyle: { fontSize: 16 },
      }}
    >
      <Screen
        name="CriarPage"
        component={Criar}
        options={{
          title: "Criar",
          headerTitle: (props) => (
            <TouchableOpacity
              {...props}
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
              <Text
                style={{
                  fontSize: 16,
                  color: colors.text,
                  fontWeight: "bold",
                  marginLeft: 12,
                }}
              >
                Criar
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Screen
        name="CriarAluno"
        component={CriarAluno}
        options={{
          title: "Aluno",
        }}
      />
      <Screen
        name="CriarUsuario"
        component={CriarUsuario}
        options={{
          title: "Funcionário",
        }}
      />
      <Screen
        name="CriarTurma"
        component={CriarTurma}
        options={{
          title: "Turma",
        }}
      />
      <Screen
        name="CriarAssociacaoPDT"
        component={CriarAssociacaoPDT}
        options={{
          title: "Associação PDT",
        }}
      />
      <Screen
        name="CriarCurso"
        component={Curso}
        options={{
          title: "Curso",
        }}
      />
      <Screen
        name="CriarComunicado"
        component={Comunicado}
        options={{
          title: "Comunicado",
        }}
      />
      <Screen
        name="CriarDisciplina"
        component={Disciplina}
        options={{
          title: "Disciplina",
        }}
      />
    </Navigator>
  );
}
