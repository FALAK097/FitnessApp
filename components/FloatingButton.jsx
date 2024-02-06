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
  Octicons,
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

  const getAnimatedStyle = (index) => {
    const angle = index * 120 + 45;
    const radius = 0;

    const translateY = animation.interpolate({
      inputRange: [0, 100],
      outputRange: [0, -radius * Math.sin((angle * Math.PI) / 180)],
    });
    const translateX = animation.interpolate({
      inputRange: [0, 100],
      outputRange: [0, radius * Math.cos((angle * Math.PI) / 180)],
    });
    return {
      transform: [{ scale: animation }, { translateX }, { translateY }],
    };
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

  return (
    <View style={styles.container}>
      {open &&
        [...Array(3)].map((_, index) => (
          <TouchableOpacity key={index}>
            <Animated.View
              style={[
                styles.button,
                getAnimatedStyle(index),
                { backgroundColor: theme.logOutButton },
              ]}>
              {index === 0 ? (
                <Octicons
                  name="device-camera"
                  size={30}
                  color="#fff"
                  onPress={() => {
                    navigation.navigate('MachineDetection');
                    toggleMenu();
                  }}
                />
              ) : index === 1 ? (
                <MaterialCommunityIcons
                  name="run-fast"
                  size={30}
                  color="#fff"
                  onPress={() => {
                    navigation.navigate('StepCounterPage');
                    toggleMenu();
                  }}
                />
              ) : (
                <FontAwesome5
                  name="rocketchat"
                  size={24}
                  color="#fff"
                  onPress={() => {
                    navigation.navigate('ChatBot');
                    toggleMenu();
                  }}
                />
              )}
            </Animated.View>
          </TouchableOpacity>
        ))}
      <TouchableOpacity onPress={toggleMenu}>
        <Animated.View
          style={[
            styles.button,
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
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 5,
  },
});
