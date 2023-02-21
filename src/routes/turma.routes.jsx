import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import Home from "../pages/Home";
import Turma from "../pages/Turma";
import AlunoPerfil from "../pages/AlunoProfile";
import Professores from "../pages/Professores";
import AddNotas from "../pages/AddNotas";
import ExpoPrint from "../pages/ExpoPrint";

export default function TurmaRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Turma" component={Turma} />
      <Screen name="AlunoPerfil" component={AlunoPerfil} />
      <Screen name="Professores" component={Professores} />
      <Screen
        name="Imprimir"
        component={ExpoPrint}
        options={{
          presentation: "modal",
          animationTypeForReplace: "pop",
          animation: "slide_from_bottom",
        }}
      />
      <Screen
        name="AddNotas"
        component={AddNotas}
        options={{
          presentation: "modal",
          animationTypeForReplace: "push",
          animation: "slide_from_bottom",
        }}
      />
    </Navigator>
  );
}
