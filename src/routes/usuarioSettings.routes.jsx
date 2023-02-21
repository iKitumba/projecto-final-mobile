import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import Settings from "../pages/Settings";
import AlterarUsuarioSenha from "../pages/AlterarUsuarioSenha";

export default function UsuarioSettingsRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Settings" component={Settings} />
      <Screen name="AlterarUsuarioSenha" component={AlterarUsuarioSenha} />
    </Navigator>
  );
}
