import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "../ui/home";
import CartScreen from "../ui/cart";
import { Image, Platform, StyleSheet } from "react-native";
import { colorDark, colorOrange } from "../constant/colors";
import { Assets } from "../constant/assets";
import { StatusBar } from "expo-status-bar";
import FavouriteScreen from "../ui/favourite";
import OrderHistory from "../ui/order";

const BottomBar = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BottomBar.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          tabBarActiveTintColor: colorOrange,
          tabBarStyle: styles.tabBarStyle,
          tabBarItemStyle: styles.tabBarItemStyle,
        }}
      >
        <BottomBar.Screen
          component={HomeScreen}
          name="HomeScreen"
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Image source={Assets.iconHomeSelected} />
              ) : (
                <Image source={Assets.iconHomeUnSelected} />
              ),
            headerShown: false,
          }}
        />

        {/* {() => <HomeScreen />} */}
        <BottomBar.Screen
          component={CartScreen}
          name="CartScreen"
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Image source={Assets.iconCartSelected} />
              ) : (
                <Image source={Assets.iconCartUnSelected} />
              ),
            headerShown: false,
          }}
        />

        <BottomBar.Screen
          component={FavouriteScreen}
          name="FavouriteScreen"
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Image source={Assets.iconHeartSelected} />
              ) : (
                <Image source={Assets.iconHeartUnSelected} />
              ),
            headerShown: false,
          }}
        />

        <BottomBar.Screen
          component={OrderHistory}
          name="OrderHistory"
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Image source={Assets.iconNotiSelected} />
              ) : (
                <Image source={Assets.iconNotiUnSelected} />
              ),
            headerShown: false,
          }}
        />
      </BottomBar.Navigator>
    </SafeAreaView>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorDark,
    marginBottom: Platform.OS === "ios" ? -10 : 0,
  },
  tabBarStyle: {
    height: 55,
    borderTopWidth: 0,
    elevation: 0,
    backgroundColor: colorDark,
  },
  tabBarItemStyle: {
    height: 55,
  },
});
