import { View, Text, Image,  } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { TabNavigation } from './tabNavigation'
import BodyParts from '../app/BodyParts'
import Profile from '../app/Profile'
import MachineDetection from '../app/MachineDetection'
import { SafeAreaView } from 'react-native-safe-area-context'
import DietScreen from '../app/DietScreen'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const Drawer = createDrawerNavigator()


const DrawerNavigation = () => {
  const navigation = useNavigation();
  const handleAvatarClick = () => {
    navigation.navigate('Profile');
  };

  return (
    <Drawer.Navigator

      drawerContent={
        (props)=>{
          return (
            <SafeAreaView>
              <View style={{
                height: 200,
                width: "100%",
                justifyContent:"center",
                alignItems: "center",
                backgroundColor: "#fff"
              }}>
                <TouchableOpacity activeOpacity={0.6} onPress={handleAvatarClick}>
                <Image source={require("../assets/icons/avatar.png")} 
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  marginBottom: 12
                }}
                />
                </TouchableOpacity>
                <Text style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#000"
                }}>
                  John Doe
                </Text>
              </View>
              <DrawerItemList {...props} />
            </SafeAreaView>
          )
        }
      }
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 250
        },
        headerStyle: {
          backgroundColor: "#fff"
        },
        headerShown: false,
        headerTintColor: "#000",
        drawerLabelStyle: {
          color: "#000",
          fontSize: 14,
          marginLeft: -10
        }
      }}
    >
      <Drawer.Screen
        name="DrawHome"
        options={{
          drawerLabel: "Home",
          title: "Home",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="home" size={24} color="#000" />
          )
        }}
        component={TabNavigation}
      />
      <Drawer.Screen
        name="DrawExercise"
        options={{
          drawerLabel: "Exercise",
          title: "Exercise",
          headerShadowVisible: false,
          drawerIcon: () => (
            <FontAwesome5 name="dumbbell" size={24} color="#000" />
          )
        }}
        component={BodyParts}
      />
      <Drawer.Screen
        name="DrawCamera"
        options={{
          drawerLabel: "Camera",
          title: "DrawCamera",
          headerShadowVisible: false,
          drawerIcon: () => (
            <FontAwesome5 name="camera" size={24} color="#000" />
          )
        }}
        component={MachineDetection}
      />
      <Drawer.Screen
        name="DrawDiet"
        options={{
          drawerLabel: "Diet",
          title: "Diet",
          headerShadowVisible: false,
          drawerIcon: () => (
            <MaterialIcons name="food-bank" size={30} color="#000" />
          )
        }}
        component={DietScreen}
      />
      <Drawer.Screen
        name="DrawProfile"
        options={{
          drawerLabel: "Profile",
          title: "Profile",
          headerShadowVisible: false,
          drawerIcon: () => (
            <FontAwesome5 name="user" size={24} color="#000" />
          )
        }}
        component={Profile}
      />

    </Drawer.Navigator>
  )
}

export default DrawerNavigation;