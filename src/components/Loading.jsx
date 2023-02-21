import { View, ActivityIndicator } from "react-native";

import { colors } from "../theme/colors";

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={colors.accent} />
    </View>
  );
}
