import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BodyParts from '../app/BodyParts';
import Profile from '../app/Profile';
import MachineDetection from '../app/MachineDetection';
import DietScreen from '../app/DietScreen';
import ChatBot from '../app/ChatBot';

import { TabNavigation } from './tabNavigation';
import { useTheme } from '../context/ThemeContext';
import { useAvatar } from '../context/AvatarContext';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { avatar, updateAvatar } = useAvatar();

  useEffect(() => {
    fetchAvatar();
  }, []);

  const fetchAvatar = async () => {
    try {
      const storedUri = await AsyncStorage.getItem('avatarURI');
      if (storedUri) {
        const uri = JSON.parse(storedUri); // Parse the stored URI
        updateAvatar(uri);
      }
    } catch (error) {
      console.error('Error fetching avatar:', error);
    }
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView
            style={{ backgroundColor: theme.drawerBackgroundColor, flex: 1 }}>
            <View
              style={{
                height: 200,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  navigation.navigate('TabProfile', { screen: 'Profile' })
                }>
                <Image
                  source={avatar}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                    marginBottom: 12,
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: theme.drawerTextColor,
                }}>
                {/* John Doe */}
              </Text>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          width: 270,
        },
        headerStyle: {
          backgroundColor: theme.drawerBackgroundColor,
        },
        headerShown: false,
        headerTintColor: theme.drawerTextColor,
        drawerLabelStyle: {
          color: theme.drawerTextColor,
          fontSize: 14,
          marginLeft: -10,
        },
        drawerItemStyle: {
          marginLeft: 0,
          paddingLeft: 10,
        },
        gestureEnabled: true,
        gestureDistanceThreshold: 500,
      }}>
      <Drawer.Screen
        name="DrawHome"
        component={TabNavigation}
        options={{
          drawerLabel: 'Home',
          title: 'Home',
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="home" size={24} color={theme.drawerIconColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="DrawChatBot"
        options={{
          drawerLabel: 'ChatBot',
          title: 'ChatBot',
          headerShadowVisible: false,
          drawerIcon: () => (
            <FontAwesome5
              name="rocketchat"
              size={24}
              color={theme.drawerIconColor}
            />
          ),
        }}
        component={ChatBot}
      />
      <Drawer.Screen
        name="DrawExercise"
        component={BodyParts}
        options={{
          drawerLabel: 'Exercise',
          title: 'Exercise',
          headerShadowVisible: false,
          drawerIcon: () => (
            <FontAwesome5
              name="dumbbell"
              size={24}
              color={theme.drawerIconColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="DrawCamera"
        component={MachineDetection}
        options={{
          drawerLabel: 'Detect',
          title: 'DrawCamera',
          headerShadowVisible: false,
          drawerIcon: () => (
            <FontAwesome5
              name="camera"
              size={24}
              color={theme.drawerIconColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="DrawDiet"
        component={DietScreen}
        options={{
          drawerLabel: 'Diet',
          title: 'Diet',
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons
              name="fast-food"
              size={30}
              color={theme.drawerIconColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="DrawProfile"
        component={Profile}
        options={{
          drawerLabel: 'Profile',
          title: 'Profile',
          headerShadowVisible: false,
          drawerIcon: () => (
            <FontAwesome name="user" size={24} color={theme.drawerIconColor} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
