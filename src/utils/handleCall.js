import { Linking, Platform } from "react-native";

export function handleCall({ telefone }) {
  let phoneNumber = "";

  if (Platform.OS === "android") {
    phoneNumber = `tel:${telefone}`;
  } else {
    phoneNumber = `telprompt:${telefone}`;
  }

  Linking.openURL(phoneNumber);
}
