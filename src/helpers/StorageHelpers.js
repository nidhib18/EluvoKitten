import { AsyncStorage } from "react-native";

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
    // saving error
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
      // value previously stored
    } else {
      return "";
    }
  } catch (e) {
  
  }
};