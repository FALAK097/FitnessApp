import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';

export default function GoalSelection() {
  const route = useRoute();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const { selectedGender, age, height, weight, activityLvl } = route.params;
  const [goal, setGoal] = useState(null);

  const goToDietShow = () => {
    if (age && height && weight && selectedGender && activityLvl && goal) {
      navigation.navigate('DietShow', {
        selectedGender: route.params.selectedGender,
        age: age,
        height: height,
        weight: weight,
        activityLvl: activityLvl,
        goal: goal,
      });
    } else {
      alert('Please select a goal');
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.mainBackgroundColor },
      ]}>
      <Text style={[styles.header, { color: theme.textColor }]}>
        What is your goal?
      </Text>
      <TouchableOpacity
        style={[styles.btn, goal === 'lose' && styles.selectedBtn]}
        onPress={() => setGoal('lose')}>
        <Text style={styles.btnText}>Lose Weight</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, goal === 'maintain' && styles.selectedBtn]}
        onPress={() => setGoal('maintain')}>
        <Text style={styles.btnText}>Maintain Weight</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, goal === 'gain' && styles.selectedBtn]}
        onPress={() => setGoal('gain')}>
        <Text style={styles.btnText}>Gain Weight</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.proceedBtn} onPress={goToDietShow}>
        <Text style={styles.btnText}>Proceed further</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
  },
  btn: {
    paddingHorizontal: 15,
    backgroundColor: '#EAEAEA',
    marginVertical: 10,
    paddingVertical: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  selectedBtn: {
    backgroundColor: '#FFD700',
  },
  btnText: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  proceedBtn: {
    marginTop: 40,
    backgroundColor: '#EFA900',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '90%',
    alignItems: 'center',
  },
});
