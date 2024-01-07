import { View, Text, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ImageSlider from '../components/ImageSlider';
import BodyParts from '../components/BodyParts';

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white flex space-y-5" edges={['top']}>
      <StatusBar style="dark" />

      <View className="flex-row justify-between items-center mx-5">
        <View className="space-y-2">
          <Text
            style={{ fontSize: hp(4.5) }}
            className="font-bold tracking-wide text-neutral-700">
            READY TO
          </Text>
          <Text
            style={{ fontSize: hp(4.5) }}
            className="font-bold tracking-wide text-rose-500">
            WORKOUT
          </Text>
        </View>

        <View className="flex justify-center items-center space-y-2">
          <Image
            source={require('../assets/images/avatar.png')}
            style={{ height: hp(7), width: wp(15) }}
            className="rounded-full"
          />
          <View
            className="bg-neutral-200 rounded-full flex justify-center items-center border-[3px] border-neutral-300"
            style={{ height: hp(6.5), width: hp(6.5) }}>
            <Ionicons name="notifications" size={hp(3)} color="gray" />
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
