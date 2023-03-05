import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Comunicados from "../pages/Comunicados";
import { Ionicons } from "@expo/vector-icons";

const { Navigator, Screen } = createBottomTabNavigator();

import TurmaRoutes from "./turma.routes";
import Settings from "../pages/Settings";
import UsuarioSenttingsRoutes from "./usuarioSettings.routes";

import { colors } from "../theme/colors";

export default function ProfessorRoutes() {
  return (
    <Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: colors.grey,
        },
      }}
    >
      <Screen
        name="TurmaRoutes"
        component={TurmaRoutes}
        options={{
          tabBarIcon: ({ size, focused }) => {
            return (
              <Ionicons
                size={28}
                color={focused ? colors.accent : colors.text}
                name="layers-outline"
              />
            );
          },
        }}
      />
      <Screen
        name="Comunicados"
        component={Comunicados}
        options={{
          tabBarIcon: ({ size, focused }) => {
            return (
              <Ionicons
                size={28}
                color={focused ? colors.accent : colors.text}
                name="megaphone-outline"
              />
            );
          },
        }}
      />
      <Screen
        name="ProfSettingsRoutes"
        component={UsuarioSenttingsRoutes}
        options={{
          tabBarIcon: ({ size, focused }) => {
            return (
              <Ionicons
                size={28}
                color={focused ? colors.accent : colors.text}
                name="options"
              />
            );
          },
        }}
      />
    </Navigator>
  );
}
