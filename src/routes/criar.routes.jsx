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
import { Text, View } from "react-native";

export default function CriarRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: true,
        title: "Criar",
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.text,
        headerTitleStyle: { fontSize: 16 },
        headerBackButtonMenuEnabled: true,
        headerTitle: (props) => (
          <View
            {...props}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="arrow-back" />
            <Text>Criar</Text>
          </View>
        ),
      }}
    >
      <Screen name="CriarPage" component={Criar} />
      <Screen
        name="CriarAluno"
        component={CriarAluno}
        options={{
          headerShown: true,
          // headerShadowVisible: false,
          title: "Aluno",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.text,
          headerTitleStyle: { fontSize: 16 },
        }}
      />
      <Screen name="CriarUsuario" component={CriarUsuario} />
      <Screen name="CriarTurma" component={CriarTurma} />
      <Screen name="CriarAssociacaoPDT" component={CriarAssociacaoPDT} />
      <Screen name="CriarCurso" component={Curso} />
      <Screen name="CriarComunicado" component={Comunicado} />
      <Screen name="CriarDisciplina" component={Disciplina} />
    </Navigator>
  );
}
