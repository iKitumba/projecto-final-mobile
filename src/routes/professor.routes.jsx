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
            return focused ? (
              <Ionicons size={28} color={colors.accent} name="md-person" />
            ) : (
              <Ionicons
                size={28}
                color={colors.text}
                name="md-person-outline"
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
            return focused ? (
              <Ionicons size={28} color={colors.accent} name="notifications" />
            ) : (
              <Ionicons
                size={28}
                color={colors.text}
                name="notifications-outline"
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
            return focused ? (
              <Ionicons size={28} color={colors.accent} name="md-settings" />
            ) : (
              <Ionicons
                size={28}
                color={colors.text}
                name="md-settings-outline"
              />
            );
          },
        }}
      />
    </Navigator>
  );
}
