import AsyncStorage from "@react-native-async-storage/async-storage";

export const useToken = async () => {
  const token = await AsyncStorage.getItem("@PAP:token");

  return token;
};
