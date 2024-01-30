import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Platform } from 'react-native';
import {
  MaterialIcons,
  FontAwesome5,
  Octicons,
  Ionicons,
} from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';

import Home from '../app/Home';
import Profile from '../app/Profile';
import BodyParts from '../app/BodyParts';
import MachineDetection from '../app/MachineDetection';
import DietScreen from '../app/DietScreen';

const Tab = createBottomTabNavigator();

const screenOptions = () => {
  return {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      elevation: 0,
      background: '#fff',
      height: 60,
    },
    tabBarActiveTintColor: '#fff',
    tabBarInactiveTintColor: '#B8C2CC',
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    tabBarIconStyle: {
      marginBottom: 5,
    },
  };
};

export const TabNavigation = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator initialRouteName="TabHome" screenOptions={screenOptions}>
      <Tab.Screen
        name="TabHome"
        component={Home}
        initialParams={{ navigation }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.selectedBtn : styles.otherBtn}>
              <Ionicons
                name="home"
                size={24}
                color={focused ? 'white' : '#111'}
              />
              <Text style={{ fontSize: 12, color: focused ? 'white' : '#111' }}>
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
            <View style={focused ? styles.selectedBtn : styles.otherBtn}>
              <FontAwesome5
                name="dumbbell"
                size={24}
                color={focused ? 'white' : '#111'}
              />
              <Text style={{ fontSize: 12, color: focused ? 'white' : '#111' }}>
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
            <View style={focused ? styles.selectedBtn : styles.otherBtn}>
              <Octicons
                name="device-camera"
                size={24}
                color={focused ? 'white' : '#16247d'}
              />
              <Text style={{ fontSize: 12, color: focused ? 'white' : '#111' }}>
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
            <View style={focused ? styles.selectedBtn : styles.otherBtn}>
              <MaterialIcons
                name="food-bank"
                size={30}
                color={focused ? 'white' : '#111'}
              />
              <Text style={{ fontSize: 12, color: focused ? 'white' : '#111' }}>
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
            <View style={focused ? styles.selectedBtn : styles.otherBtn}>
              <FontAwesome5
                name="user"
                size={24}
                color={focused ? 'white' : '#111'}
              />
              <Text style={{ fontSize: 12, color: focused ? 'white' : '#111' }}>
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
    backgroundColor: '#16247d',
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
