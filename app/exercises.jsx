import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchExercisesByBodypart } from '../api/exerciseDB';

export default function Exercises() {
  const router = useRouter();
  const item = useLocalSearchParams();
  console.log(item);

  useEffect(() => {
    if (item) getExercises(item.name);
  }, [item]);

  const getExercises = async (bodyPart) => {
    try {
      let data = await fetchExercisesByBodypart(bodyPart);
      console.log(data);
    } catch (error) {
      console.error('Error during API request:', error.message);
      console.log(error.response.data);
    }
  };

  return (
    <View className="mt-20">
      <Text>Exercises</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
