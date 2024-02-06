import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function DietScreen() {
  const [selectedGender, setSelectedGender] = useState('Male');
  const navigation = useNavigation();
  const { theme } = useTheme();

  const goToUserInfo = () => {
    navigation.navigate('UserInfoPage', { selectedGender });
  };

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.mainBackgroundColor },
      ]}>
      <Text style={[styles.title, { color: theme.textColor }]}>
        Choose Your Gender
      </Text>
      <View style={styles.genderButtons}>
        <TouchableOpacity
          style={
            selectedGender === 'Male'
              ? [styles.selectedBtn, { borderColor: theme.textColor }]
              : styles.btn
          }
          onPress={() => handleGenderSelection('Male')}>
          <Image
            source={require('../assets/images/diet/Male.png')}
            style={{
              height: selectedGender === 'Male' ? 120 : 80,
              width: selectedGender === 'Male' ? 120 : 80,
              borderWidth: selectedGender === 'Male' ? 5 : 0,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectedGender === 'Female'
              ? [styles.selectedBtn, { borderColor: theme.textColor }]
              : styles.btn
          }
          onPress={() => handleGenderSelection('Female')}>
          <Image
            source={require('../assets/images/diet/Female.png')}
            style={{
              height: selectedGender === 'Female' ? 120 : 80,
              width: selectedGender === 'Female' ? 120 : 80,
              borderWidth: selectedGender === 'Female' ? 5 : 0,
            }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.selectedGenderBtn} onPress={goToUserInfo}>
        <Text style={styles.selectedGenderText}>Proceed further</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  genderButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  btn: {
    paddingHorizontal: 20,
    margin: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  selectedBtn: {
    paddingHorizontal: 20,
    margin: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: 'Black',
    borderWidth: 10,
  },
  selectedBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  selectedGenderBtn: {
    backgroundColor: '#EFA900',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  selectedGenderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
