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
            return (
              <Ionicons
                size={28}
                color={focused ? colors.accent : colors.text}
                name="person-outline"
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
        name="AlunoSettingsRoutes"
        component={AlunoSettingsRoutes}
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
  ) : (
    <UnloggedRoutes />
  );
}
