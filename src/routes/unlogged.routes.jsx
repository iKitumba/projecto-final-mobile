import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import Login from "../pages/Login";
import EsqueciMinhaSenha from "../pages/EsqueciMinhaSenha";

export default function UnloggedRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="Login"
        component={Login}
        // options={{
        //   presentation: "modal",
        //   animationTypeForReplace: "pop",
        //   animation: "slide_from_bottom",
        // }}
      />
      <Screen
        name="EsqueciMinhaSenha"
        component={EsqueciMinhaSenha}
        // options={{
        //   presentation: "modal",
        //   animationTypeForReplace: "pop",
        //   animation: "slide_from_bottom",
        // }}
      />
    </Navigator>
  );
}
