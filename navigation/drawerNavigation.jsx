import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { TabNavigation } from './tabNavigation';
import BodyParts from '../app/BodyParts';
import Profile from '../app/Profile';
import MachineDetection from '../app/MachineDetection';
import { SafeAreaView } from 'react-native-safe-area-context';
import DietScreen from '../app/DietScreen';
import { useTheme } from '../components/ThemeContext';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const handleAvatarClick = () => {
    navigation.navigate('Profile');
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView
            style={{ backgroundColor: theme.drawerBackgroundColor }}>
            <View
              style={{
                height: 200,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity activeOpacity={0.6} onPress={handleAvatarClick}>
                <Image
                  source={require('../assets/icons/avatar.png')}
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
                John Doe
              </Text>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.drawerBackgroundColor,
          width: 250,
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
      }}>
      <Drawer.Screen
        name="DrawHome"
        options={{
          drawerLabel: 'Home',
          title: 'Home',
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="home" size={24} color={theme.drawerIconColor} />
          ),
        }}
        component={TabNavigation}
      />
      <Drawer.Screen
        name="DrawExercise"
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
        component={BodyParts}
      />
      <Drawer.Screen
        name="DrawCamera"
        options={{
          drawerLabel: 'Camera',
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
        component={MachineDetection}
      />
      <Drawer.Screen
        name="DrawDiet"
        options={{
          drawerLabel: 'Diet',
          title: 'Diet',
          headerShadowVisible: false,
          drawerIcon: () => (
            <MaterialIcons
              name="food-bank"
              size={30}
              color={theme.drawerIconColor}
            />
          ),
        }}
        component={DietScreen}
      />
      <Drawer.Screen
        name="DrawProfile"
        options={{
          drawerLabel: 'Profile',
          title: 'Profile',
          headerShadowVisible: false,
          drawerIcon: () => (
            <FontAwesome5 name="user" size={24} color={theme.drawerIconColor} />
          ),
        }}
        component={Profile}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
