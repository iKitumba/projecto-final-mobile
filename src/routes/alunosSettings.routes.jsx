import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlterarSenha from "../pages/AlterarSenha";

const { Navigator, Screen } = createNativeStackNavigator();

import AlunoSettings from "../pages/AlunoSettings";

export default function AlunoSettingsRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="AlunoSettings" component={AlunoSettings} />
      <Screen name="AlterarSenha" component={AlterarSenha} />
    </Navigator>
  );
}
