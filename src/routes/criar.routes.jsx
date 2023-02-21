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

export default function CriarRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="CriarPage" component={Criar} />
      <Screen name="CriarAluno" component={CriarAluno} />
      <Screen name="CriarUsuario" component={CriarUsuario} />
      <Screen name="CriarTurma" component={CriarTurma} />
      <Screen name="CriarAssociacaoPDT" component={CriarAssociacaoPDT} />
      <Screen name="CriarCurso" component={Curso} />
      <Screen name="CriarComunicado" component={Comunicado} />
      <Screen name="CriarDisciplina" component={Disciplina} />
    </Navigator>
  );
}
