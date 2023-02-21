import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddNotas from "../pages/AddNotas";
import Aluno from "../pages/Aluno";
import ExpoPrint from "../pages/ExpoPrint";
import Professores from "../pages/Professores";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AlunoEncarregadoProfileRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Aluno" component={Aluno} />
      <Screen name="Professores" component={Professores} />
      <Screen name="AddNotas" component={AddNotas} />
      <Screen
        name="Imprimir"
        component={ExpoPrint}
        options={{
          presentation: "modal",
          animationTypeForReplace: "pop",
          animation: "slide_from_bottom",
        }}
      />
    </Navigator>
  );
}
