import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Comunicados from "../pages/Comunicados";
import { Ionicons } from "@expo/vector-icons";

import UnloggedRoutes from "./unlogged.routes";

const { Navigator, Screen } = createBottomTabNavigator();

import { AuthContext } from "../contexts/AuthContext";
import AlunoEncarregadoProfileRoutes from "./alunoEncarregadoProfile.routes";
import AlunoSettingsRoutes from "./alunosSettings.routes";

import { colors } from "../theme/colors";

export default function AlunoRoutes() {
  const { logged } = useContext(AuthContext);

  return logged ? (
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
        name="AlunoEncarregadoProfileRoutes"
        component={AlunoEncarregadoProfileRoutes}
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
        name="AlunoSettingsRoutes"
        component={AlunoSettingsRoutes}
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
  ) : (
    <UnloggedRoutes />
  );
}
