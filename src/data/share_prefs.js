import AsyncStorage from "@react-native-async-storage/async-storage";
const USER_DATA = "USER_DATA";
const ISLOGINED = "ISLOGINED";

export const SharePrefs = {
    GET_USER_DATA: async () => await AsyncStorage.getItem(USER_DATA),
    SET_USER_DATA: async (data) => {
      if (typeof data != String) {
        data = JSON.stringify(data);
      }
  
      await AsyncStorage.setItem(USER_DATA, data);
    },
    GET_LOGIN_STATE: async () => await AsyncStorage.getItem(ISLOGINED),
    SET_LOGIN_STATE: async (data) => {
        if (typeof data != String) {
            data = JSON.stringify(data);
          }
        await AsyncStorage.setItem(ISLOGINED, data);
      },
      
    RESET_ALL: async () => {
        try {
          //xoá gì thì thêm vào đây
          await AsyncStorage.removeItem(ISLOGINED);
        } catch (error) {
          console.error("Error resetting data:", error);
        }
      },
}