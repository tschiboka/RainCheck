// Dependencies
import * as React from 'react';
import { StyleSheet, Text, View, Animated, Image } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { AppStateProvider } from './AppState';

// Components
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingScreen';
import HourlyScreen from './components/HourlyScreen';
import DailyScreen from './components/DailyScreen';

// Icons
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


// Animation
const FadeInView = (props, { navigation }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useFocusEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    return () => {
      Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }).start();
    };
  });

  return (
    // Bind opacity to animated value
    <Animated.View  style={{ flex: 1, opacity: fadeAnim }}>
      { props.children }
    </Animated.View>
  );
};

const FadeHomeScreen = (props, { navigation }, params) => <FadeInView><HomeScreen {...props } /></FadeInView>
const FadeHourlysScreen = (props, { navigation }) => <FadeInView><HourlyScreen {...props} /></FadeInView>
const FadeDailysScreen = (props, { navigation }) => <FadeInView><DailyScreen {...props} /></FadeInView>
const FadeSettingsScreen = (props, { navigation }) => <FadeInView><SettingsScreen {...props} /></FadeInView>



// Navigation
function Nav() {
  const screenOptions = {
    unmountOnBlur: false,
    headerShown: false,
    tabBarStyle: styles.tabBar,
    tabBarItemStyle: styles.tabItem,
    tabBarLableStyle: styles.tabLabel,
    tabBarLabelPosition: "below-icon",
    tabBarActiveTintColor: "white",
    tabInactiveTintColor: "#999",
    tabBarActiveBackgroundColor: "#191919",
    tabBarInactiveBackgroundColor: "#0d0d0d",
    tabBarHideOnKeyboard: true,
  };
  const sceneContainerStyle = { backgroundColor: "black", };
  return (
    <Tab.Navigator {...{ screenOptions, sceneContainerStyle }}>
      <Tab.Screen name="Home" component={ FadeHomeScreen }
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
              <View style={ focused ?  styles.tabIconFocused : styles.tabIcon }>
                  <AntDesign name="home" style={ focused ?  styles.tabIconImageFocused : styles.tabIconImage }/>
              </View>
      )}}/>

      <Tab.Screen name="Hourly" component={ FadeHourlysScreen } 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
              <View style={ focused ?  styles.tabIconFocused : styles.tabIcon }>
                  <Entypo name="stopwatch" style={ focused ?  styles.tabIconImageFocused : styles.tabIconImage } />
              </View>
      )}}/>

      <Tab.Screen name="Daily" component={ FadeDailysScreen } 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
              <View style={ focused ?  styles.tabIconFocused : styles.tabIcon }>
                  <MaterialCommunityIcons name="calendar-week" style={ focused ?  styles.tabIconImageFocused : styles.tabIconImage } />
              </View>
      )}}/>

      <Tab.Screen name="Settings" component={ FadeSettingsScreen } 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
              <View style={ focused ?  styles.tabIconFocused : styles.tabIcon }>
                  <Ionicons name="md-settings-outline" style={ focused ?  styles.tabIconImageFocused : styles.tabIconImage } />
              </View>
      )}}/>
      
    </Tab.Navigator>
    
  );
}
const Tab = createBottomTabNavigator();





export default function App() {
  return (
    <AppStateProvider>
      <NavigationContainer>
        <Nav />
      </NavigationContainer>
    </AppStateProvider>
  );
}



// Styles
const styles = StyleSheet.create({
  tabBar: { 
    position: "absolute",  // Hide Background
    alignItems: "center",
    width: "98%",
    height: "8.5%",
    marginLeft: "1%",
    backgroundColor: "#111",
    borderColor: "#000",
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 20,
    borderTopWidth: 0,
  },
  tabItem: {
    marginVertical: 6,
    marginHorizontal: 15,
    padding: 5, 
    borderRadius:10, 
    maxWidth: 60,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  tabIcon: {
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tabIconFocused: {
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tabBarLableStyle: {
    color: "yellow",
  },
  tabIconImage: {
    fontSize: 24,
    color: "#aaa",
  },
  tabIconImageFocused: {
    fontSize: 28,
    color: "white",
  }
});
