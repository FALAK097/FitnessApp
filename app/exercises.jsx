import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-virtualized-view';

import { fetchExercisesByBodypart } from '../api/exerciseDB';
import ExerciseList from '../components/ExerciseList';

export default function Exercises() {
  const router = useRouter();
  const [exercises, setExercises] = useState([]);
  const item = useLocalSearchParams();
  //   console.log(item);

  useEffect(() => {
    if (item) getExercises(item.name);
  }, [item]);

  const getExercises = async (bodyPart) => {
    try {
      let data = await fetchExercisesByBodypart(bodyPart);
      //   console.log(data);
      setExercises(data);
    } catch (error) {
      console.error('Error during API request:', error.message);
      console.log(error.response.data);
    }
  };

  return (
    <ScrollView>
      <StatusBar style="light" />
      <Image
        source={item.image}
        style={{ width: wp(100), height: hp(45) }}
        className="rounded-b-[40px]"
      />
      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-rose-500 mx-4 pr-1 rounded-full flex justify-center items-center absolute"
        style={{ width: hp(5.5), height: hp(5.5), marginTop: hp(7) }}>
        <Ionicons name="caret-back-outline" size={hp(4)} color="white" />
      </TouchableOpacity>

      {/* exercies */}
      <View className="mx-4 space-y-3 mt-4">
        <Text
          style={{ fontSize: hp(3) }}
          className="font-semibold text-neutral-700">
          {item.name} Exercises
        </Text>
        <View className="mb-10">
          <ExerciseList data={exercises} />
        </View>
      </View>
    </ScrollView>
  );
}
