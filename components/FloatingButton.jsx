import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { React, useRef, useState } from 'react';
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

export default function FloatingButton() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const animation = useRef(new Animated.Value(0)).current;
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    setOpen(!open);
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '135deg'],
        }),
      },
    ],
  };

  const getAnimatedStyle = (index) => {
    const angle = index * (120 / 2) + 75;
    const radius = 90;

    const translateY = animation.interpolate({
      inputRange: [0, 100],
      outputRange: [0, -radius * Math.sin((angle * Math.PI) / 180)],
    });
    const translateX = animation.interpolate({
      inputRange: [0, 1000],
      outputRange: [0, radius * Math.cos((angle * Math.PI) / 180)],
    });
    return {
      transform: [{ scale: animation }, { translateX }, { translateY }],
    };
  };

  return (
    <View style={styles.container}>
      {open &&
        [...Array(3)].map((_, index) => (
          <TouchableOpacity key={index}>
            <Animated.View
              style={[
                styles.button,
                styles.secondary,
                getAnimatedStyle(index),
                { backgroundColor: theme.logOutButton },
              ]}>
              {index === 0 ? (
                <MaterialIcons
                  name="food-bank"
                  size={30}
                  color="#fff"
                  onPress={() => navigation.navigate('DietScreen')}
                />
              ) : index === 1 ? (
                <FontAwesome5
                  name="dumbbell"
                  size={24}
                  color="#fff"
                  onPress={() => navigation.navigate('BodyParts')}
                />
              ) : (
                <Entypo
                  name="chat"
                  size={24}
                  color="#fff"
                  onPress={() => navigation.navigate('ChatBot')}
                />
              )}
            </Animated.View>
          </TouchableOpacity>
        ))}
      <TouchableOpacity onPress={toggleMenu}>
        <Animated.View
          style={[
            styles.button,
            styles.menu,
            rotation,
            { backgroundColor: theme.logOutButton },
          ]}>
          <AntDesign name="plus" size={24} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  button: {
    bottom: 80,
    right: 15,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowRadius: 10,
    shadowColor: '#f02a4b',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 5,
  },
  menu: {
    backgroundColor: '#f02a4b',
  },
  secondary: {
    backgroundColor: '#f02a4b',
  },
});

// import React, { useState} from "react";
// import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";

// const FloatingButton = () => {

//   const [icon_1] = useState(new Animated.Value(40));
//   const [icon_2] = useState(new Animated.Value(40));
//   const [icon_3] = useState(new Animated.Value(40));

//   const [pop, setPop] = useState(false);

//   const popIn = () => {
//     setPop(true);
//     Animated.timing(icon_1, {
//       toValue: 130,
//       duration: 500,
//       useNativeDriver: false,
//     }).start();
//     Animated.timing(icon_2, {
//       toValue: 110,
//       duration: 500,
//       useNativeDriver: false,
//     }).start();
//     Animated.timing(icon_3, {
//       toValue: 130,
//       duration: 500,
//       useNativeDriver: false,
//     }).start();
//   }

//   const popOut = () => {
//     setPop(false);
//     Animated.timing(icon_1, {
//       toValue: 40,
//       duration: 500,
//       useNativeDriver: false,
//     }).start();
//     Animated.timing(icon_2, {
//       toValue: 40,
//       duration: 500,
//       useNativeDriver: false,
//     }).start();
//     Animated.timing(icon_3, {
//       toValue: 40,
//       duration: 500,
//       useNativeDriver: false,
//     }).start();
//   }

//   return(
//     <View style={{
//       flex: 1
//     }}>
//       <Animated.View style={[styles.circle, { bottom: icon_1}]}>
//         <TouchableOpacity>
//           <Icon name="cloud-upload" size={25} color="#FFFF" />
//         </TouchableOpacity>
//       </Animated.View>
//       <Animated.View style={[styles.circle, { bottom: icon_2, right: icon_2}]}>
//         <TouchableOpacity>
//           <Icon name="print" size={25} color="#FFFF" />
//         </TouchableOpacity>
//       </Animated.View>
//       <Animated.View style={[styles.circle, { right: icon_3}]}>
//         <TouchableOpacity>
//           <Icon name="share-alt" size={25} color="#FFFF" />
//         </TouchableOpacity>
//       </Animated.View>
//       <TouchableOpacity
//         style={styles.circle}
//         onPress={() => {
//           pop === false ? popIn() : popOut();
//         }}
//       >
//         <Icon name="plus" size={25} color="#FFFF" />
//       </TouchableOpacity>
//     </View>
//   )

// }

// export default FloatingButton;

// const styles = StyleSheet.create({
//   circle: {
//      backgroundColor: '#f52d56',
//      width: 60,
//      height: 60,
//      position: 'absolute',
//      bottom: 40,
//      right: 40,
//      borderRadius: 50,
//      justifyContent: 'center',
//      alignItems: 'center',
//   }
// })

// import { Image, StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const FloatingButton = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.contentContainer}>
//         <View style={styles.iconContainer}>
//         <Image source={require
//         ('../assets/icons/plusicon.png')} style={styles.icon}/>
//         </View>
//       </View>
//     </View>
//   )
// }

// export default FloatingButton;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   contentContainer: {
//     backgroundColor: '#0f56b3',
//     position: 'absolute',
//     bottom: 30,
//     right: 30,
//     borderRadius: 50
//   },
//   iconContainer: {
//     width: 60,
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   icon: {
//     width: 26,
//     height: 26,
//     borderRadius: 30
//   }
// })

// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import React from 'react';
// import { Ionicons, AntDesign } from '@expo/vector-icons';
// import Animated from 'react-native-reanimated';
// import { useRef } from 'react';

// export default function FloatingButton() {
//   const animation = useRef(new Animated.Value(0)).current;

//   const rotation = {
//     transform : [
//       {
//         rotate: animation.interpolate({
//           inputRange: [0,1],
//           outputRange: ["0deg", "180deg"]
//         })
//       }
//     ]
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.bottomContainer}>
//         <TouchableOpacity>
//           <Animated.View style={[styles.button, styles.menu, rotation]}>
//             <AntDesign name='plus' size={24} color='#fff'/>
//           </Animated.View>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0
//   },
//   bottomContainer: {
//     flexDirection: 'row'
//   },
//     button: {
//     position: 'absolute',
//     bottom: 70,
//     right:36,
//     width: 60,
//     height:60,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 999,
//     shadowRadius: 10,
//     shadowColor: "#f02a4b",
//     shadowOpacity: 0.5,
//     shadowOffset: {
//       width: 0,
//       height: 10
//     },
//     elevation: 5
//   },
//   menu: {
//     backgroundColor: "#f02a4b",
//   }
// })
