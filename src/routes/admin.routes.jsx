import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Comunicados from "../pages/Comunicados";
import { Ionicons } from "@expo/vector-icons";


import AdminTurmaRoutes from "./adminTurma.routes"
import CriarRoutes from "./criar.routes";

const { Navigator, Screen } = createBottomTabNavigator();
import ActionButton from "../components/ActionButton";

import AllProfessores from "../pages/AllProfessores";
import UsuarioSettingsRoutes from "./usuarioSettings.routes";
import { colors } from "../theme/colors";

export default function AdminRoutes({}) {
  return (
    <Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === "ios" ? 90 : 70,
          backgroundColor: colors.grey,
        },
      }}
    >
      <Screen
        name="TurmaRoutes"
        component={AdminTurmaRoutes}
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
        name="AllProfessores"
        component={AllProfessores}
        options={{
          tabBarIcon: ({ size, focused }) => {
            return (
              <Ionicons
                size={28}
                color={focused ? colors.accent : colors.text}
                name="people-outline"
              />
            );
          },
        }}
      />

      <Screen
        name="Criar"
        component={CriarRoutes}
        options={{
          tabBarButton: (props) => {
            return <ActionButton {...props} />;
          },
          tabBarIcon: ({ size, focused }) => {
            return <Ionicons size={28} color="#F7F7F7" name="add" />;
          },
          tabBarStyle: {
            display: "none",
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
                name="notifications-outline"
              />
            );
          },
        }}
      />
      <Screen
        name="UsuarioSettingsRoutes"
        component={UsuarioSettingsRoutes}
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
