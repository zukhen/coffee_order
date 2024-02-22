import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import TabsNavigation from './src/navigation/tab_navigation';

export default function App() {
  return (
    <NavigationContainer>
    <TabsNavigation />
  </NavigationContainer>
  );
}


