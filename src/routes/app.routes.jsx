import { useCallback, useContext } from "react";
import { View } from "react-native";

import UnloggedRoutes from "./unlogged.routes";

import { AuthContext } from "../contexts/AuthContext";
import AdminRoutes from "./admin.routes";
import ProfessorRoutes from "./professor.routes";
import AlunoRoutes from "./aluno.routes";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function AppRoutes() {
  const { logged, usuario, loading } = useContext(AuthContext);

  const onLayoutRootView = useCallback(async () => {
    if (!loading) {
      await SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) {
    return null;
  }

  if (
    (logged && usuario.tipo_usuario === "ADMIN") ||
    (logged && usuario.tipo_usuario === "PROFESSOR_ADMIN")
  ) {
    return (
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <AdminRoutes />
      </View>
    );
  }

  if (logged && usuario.tipo_usuario === "PROFESSOR") {
    return (
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <ProfessorRoutes />
      </View>
    );
  }

  if (logged && usuario.turma_id) {
    return (
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <AlunoRoutes />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <UnloggedRoutes />
    </View>
  );
}
