import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-virtualized-view';

import { fetchExercisesByBodypart } from '../api/exerciseDB';
import ExerciseList from '../components/ExerciseList';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function Exercises() {
  const navigation = useNavigation();
  const [exercises, setExercises] = useState([]);
  const { params: item } = useLocalSearchParams();
  const { theme } = useTheme();

  useEffect(() => {
    if (item) {
      getExercises(item.name);
    }
  }, [item]);

  const getExercises = async (bodyPart) => {
    try {
      const data = await fetchExercisesByBodypart(bodyPart);
      setExercises(data);
    } catch (error) {
      console.error('Error during API request:', error);

      if (error.response) {
        console.log('Response data:', error.response.data);
      }
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      alwaysBounceHorizontal={false}
      alwaysBounceVertical={false}
      bounces={false}
      style={{ backgroundColor: theme.mainBackgroundColor }}>
      <StatusBar style="auto" />
      <Image
        source={item?.image}
        style={{
          width: wp(100),
          height: hp(40),
          resizeMode: 'cover',
          marginBottom: 2,
        }}
        className="rounded-b-[40px]"
      />
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.goBack()}
        className="mx-4 pr-1 rounded-full flex justify-center items-center absolute"
        style={{
          width: hp(5.5),
          height: hp(5.5),
          marginTop: hp(5),
          backgroundColor: theme.mainBackgroundColor,
        }}>
        <Ionicons
          name="arrow-back"
          size={hp(4)}
          style={{ color: theme.textColor, marginLeft: 2 }}
        />
      </TouchableOpacity>

      {/* exercies */}
      <View className="mx-4 space-y-3 mt-4">
        <Text
          style={{ fontSize: hp(3), color: theme.textColor }}
          className="font-semibold text-neutral-700">
          {item?.name.charAt(0).toUpperCase() + item?.name.slice(1)} Exercises
        </Text>
        <View>
          <ExerciseList data={exercises} />
        </View>
      </View>
    </ScrollView>
  );
}
