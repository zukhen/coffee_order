import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Assets } from "../../constant/assets";
import { colorDark } from "../../constant/colors";
import { StatusBar } from "expo-status-bar";
import { SharePrefs } from "../../data/share_prefs";
import { StackActions } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    SharePrefs.GET_LOGIN_STATE().then((e) => {
      if (e!=null) {
        navigation.dispatch(StackActions.replace("Home"));

      } else {
        navigation.dispatch(StackActions.replace("Login"));

      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image style={styles.imageLogo} source={Assets.iconApp} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorDark,
  },
  imageLogo: {
    width: 180,
    objectFit: "contain",
    height: 180,
  },
});
