import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Platform } from 'react-native';
import {
  FontAwesome5,
  FontAwesome,
  Octicons,
  Ionicons,
} from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

import Home from '../app/Home';
import Profile from '../app/Profile';
import BodyParts from '../app/BodyParts';
import MachineDetection from '../app/MachineDetection';
import DietScreen from '../app/DietScreen';
import { useEffect, useState } from 'react';

const Tab = createBottomTabNavigator();

const screenOptions = ({ theme }) => {
  return {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      elevation: 0,
      backgroundColor: 'transparent',
      height: 60,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    tabBarIconStyle: {
      marginBottom: 5,
    },
    tabBarHideOnKeyboard: true,
  };
};

export const TabNavigation = ({ navigation }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('TabHome');

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      const tabName = e.target?.options?.title || 'TabHome';
      setActiveTab(tabName);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Tab.Navigator
      initialRouteName="TabHome"
      screenOptions={screenOptions({ theme })}>
      <Tab.Screen
        name="TabHome"
        component={Home}
        initialParams={{ navigation }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? [
                      styles.selectedBtn,
                      { backgroundColor: theme.logOutButton },
                    ]
                  : styles.otherBtn
              }>
              <Ionicons
                name="home"
                size={24}
                color={focused ? 'white' : theme.textColor}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: focused ? 'black' : theme.textColor,
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TabExercises"
        component={BodyParts}
        initialParams={{ navigation }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? [
                      styles.selectedBtn,
                      { backgroundColor: theme.logOutButton },
                    ]
                  : styles.otherBtn
              }>
              <FontAwesome5
                name="dumbbell"
                size={24}
                color={focused ? 'white' : theme.textColor}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: focused ? 'black' : theme.textColor,
                }}>
                Exercises
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TabCamera"
        component={MachineDetection}
        initialParams={{ navigation }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? [
                      styles.selectedBtn,
                      { backgroundColor: theme.logOutButton },
                    ]
                  : styles.otherBtn
              }>
              <Octicons
                name="device-camera"
                size={24}
                color={focused ? 'white' : theme.textColor}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: focused ? 'black' : theme.textColor,
                }}>
                Detect
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TabDiet"
        component={DietScreen}
        initialParams={{ navigation }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? [
                      styles.selectedBtn,
                      { backgroundColor: theme.logOutButton },
                    ]
                  : styles.otherBtn
              }>
              <Ionicons
                name="fast-food"
                size={24}
                color={focused ? 'white' : theme.textColor}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: focused ? 'black' : theme.textColor,
                }}>
                Diet
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TabProfile"
        component={Profile}
        initialParams={{ navigation }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? [
                      styles.selectedBtn,
                      { backgroundColor: theme.logOutButton },
                    ]
                  : styles.otherBtn
              }>
              <FontAwesome
                name="user"
                size={24}
                color={focused ? 'white' : theme.textColor}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: focused ? 'black' : theme.textColor,
                }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  selectedBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1BE48',
    width: Platform.OS == 'ios' ? 50 : 60,
    height: Platform.OS == 'ios' ? 50 : 60,
    top: Platform.OS == 'ios' ? -10 : -20,
    borderRadius: Platform.OS == 'ios' ? 25 : 30,
  },
  otherBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
