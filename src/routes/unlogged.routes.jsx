import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import Login from "../pages/Login";

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
    </Navigator>
  );
}
