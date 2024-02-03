import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Anticons from 'react-native-vector-icons/AntDesign';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function ExerciseDetails() {
  const item = useLocalSearchParams();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#F1BE48" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      className="flex flex-1"
      style={{
        backgroundColor: theme.mainBackgroundColor,
      }}>
      <View className="shadow-md bg-neutral-200 rounded-b-[40px]">
        <Image
          source={{ uri: item.item.gifUrl }}
          contentFit="cover"
          style={{ width: wp(100), height: wp(100) }}
          className="rounded-b-[40px]"
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={navigation.goBack}
        className="mx-2 absolute rounded-full mt-12 right-3">
        <Anticons name="closecircle" size={hp(4.5)} color="#F59E0B" />
      </TouchableOpacity>

      {/* details */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        className="mx-4 space-y-2 mt-3"
        contentContainerStyle={{ paddingBottom: 60 }}>
        <Animated.Text
          entering={FadeInDown.duration(300).springify()}
          style={{ fontSize: hp(3.5), color: theme.textColor }}
          className="font-semibold text-neutral-800 tracking-wide">
          {item.item?.name
            ? item.item.name
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
            : ''}
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(100).duration(300).springify()}
          style={{ fontSize: hp(2), color: theme.textColor }}
          className=" text-neutral-700 tracking-wide">
          Exercise:{' '}
          <Text
            className="font-bold text-neutral-800"
            style={{ color: theme.textColor }}>
            {item.item.bodyPart.charAt(0).toUpperCase() +
              item.item?.bodyPart.slice(1)}
          </Text>
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(100).duration(300).springify()}
          style={{ fontSize: hp(2), color: theme.textColor }}
          className=" text-neutral-700 tracking-wide">
          Equipment:{' '}
          <Text
            className="font-bold text-neutral-800"
            style={{ color: theme.textColor }}>
            {item.item.equipment.charAt(0).toUpperCase() +
              item.item?.equipment.slice(1)}
          </Text>
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(200).duration(300).springify()}
          style={{ fontSize: hp(2), color: theme.textColor }}
          className=" text-neutral-700 tracking-wide">
          Secondary Muscles:{' '}
          <Text
            className="font-bold text-neutral-800"
            style={{ color: theme.textColor }}>
            {item.item.secondaryMuscles
              .map((muscle) => muscle.charAt(0).toUpperCase() + muscle.slice(1))
              .join(', ')}
          </Text>
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(300).duration(300).springify()}
          style={{ fontSize: hp(2), color: theme.textColor }}
          className=" text-neutral-700 tracking-wide">
          Target:{' '}
          <Text
            className="font-bold text-neutral-800"
            style={{ color: theme.textColor }}>
            {item.item.target.charAt(0).toUpperCase() +
              item.item?.target.slice(1)}
          </Text>
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(400).duration(300).springify()}
          style={{ fontSize: hp(3), color: theme.textColor }}
          className="font-semibold text-neutral-800 tracking-wide">
          Instructions
        </Animated.Text>

        {item.item.instructions.map((instruction, index) => {
          return (
            <Animated.Text
              entering={FadeInDown.delay((index + 5) * 100)
                .duration(300)
                .springify()}
              key={instruction}
              style={{ fontSize: hp(1.7), color: theme.textColor }}
              className="text-neutral-800">
              {instruction}
            </Animated.Text>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
});
