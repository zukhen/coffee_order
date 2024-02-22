import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../ui/auth/login";
import RegisterScreen from "../ui/auth/register";
import HomeScreen from "../ui/home";
import SplashScreen from "../ui/splash";
import DetailScreen from "../ui/detail";
import BottomNavigation from "./bottom_navigation";

const Stack = createNativeStackNavigator();
const TabsNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={BottomNavigation} />
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default TabsNavigation;
