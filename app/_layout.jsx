import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
