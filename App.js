import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AppRoutes from "./src/routes/app.routes";
import AuthContextProvider from "./src/contexts/AuthContext";

import { colors } from "./src/theme/colors";

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.primary}
          translucent={true}
        />
        <AppRoutes />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
