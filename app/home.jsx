import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation, useRoute } from '@react-navigation/native';

import ImageSlider from '../components/ImageSlider';
import BodyParts from '../components/BodyParts';
import { useTheme } from '../components/ThemeContext';

export default function Home() {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();

  // const username = route.params?.username || 'Guest';

  const handleAvatarClick = () => {
    navigation.navigate('Profile');
  };

  const detectMachine = () => {
    navigation.navigate('MachineDetection');
  };
  return (
    <SafeAreaView
      className="flex-1 bg-white flex space-y-5"
      edges={['top']}
      style={{ backgroundColor: theme.mainBackgroundColor }}>
      <StatusBar style="dark" />

      <View className="flex-row justify-between items-center mx-5">
        <View className="space-y-2">
          <Text
            style={{ fontSize: hp(4.5), color: theme.textColor }}
            className="font-bold tracking-wide text-neutral-700">
            Ready To
          </Text>
          <Text
            style={{
              fontSize: hp(4.5),
              color: '#F1BE48',
            }}
            className="font-bold tracking-wide text-rose-500">
            Workout!
            {/* WORKOUT, {username}! */}
          </Text>
        </View>

        <View className="flex-row justify-center items-center space-x-4">
          <TouchableOpacity activeOpacity={0.6} onPress={handleAvatarClick}>
            <Image
              source={require('../assets/images/avatar.png')}
              style={{ height: hp(7), width: wp(15) }}
              className="rounded-full"
            />
          </TouchableOpacity>
          <View
            className="bg-neutral-200 rounded-full flex justify-center items-center border-[3px] border-neutral-300"
            style={{ height: hp(5.5), width: hp(6) }}>
            <Octicons
              name="device-camera"
              size={hp(4)}
              color="gray"
              onPress={detectMachine}
            />
          </View>
        </View>
      </View>

      {/* Image Slider */}
      <View>
        <ImageSlider />
      </View>

      {/* Body Parts lists*/}
      <View className="flex-1">
        <BodyParts />
      </View>
    </SafeAreaView>
  );
}
