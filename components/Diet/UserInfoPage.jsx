import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function UserInfoPage() {
  const route = useRoute();
  const { selectedGender } = route.params;
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const navigation = useNavigation();

  const goToActivityLevel = () => {
    if (age && height && weight) {
      navigation.navigate('ActivityLevel', {
        selectedGender: route.params.selectedGender,
        age: age,
        height: height,
        weight: weight,
      });
    } else {
      alert('Please fill in all the fields');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Weight (kilograms)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <TouchableOpacity style={styles.proceedBtn} onPress={goToActivityLevel}>
        <Text style={styles.proceedBtnText}>Proceed further</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  inputField: {
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: 'black',
    width: '80%',
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  proceedBtn: {
    backgroundColor: '#EFA900',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  proceedBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
