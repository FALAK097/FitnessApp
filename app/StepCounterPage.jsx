import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Pedometer } from 'expo-sensors';
import CircularProgress from 'react-native-circular-progress-indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

export default function StepCounterPage() {
  const { theme } = useTheme();

  const [PedometerAvailability, setPedometerAvailability] = useState('');
  const [StepCount, setStepCount] = useState(0);

  useEffect(() => {
    subscribe();
    loadStepCountFromStorage();
    resetStepCountIfNecessary();
  }, []);

  useEffect(() => {
    saveStepCountToStorage();
  }, [StepCount]);

  const subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      setStepCount(result.steps);
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        setPedometerAvailability(String(result));
      },
      (error) => {
        setPedometerAvailability(error);
      }
    );
  };

  const loadStepCountFromStorage = async () => {
    try {
      const storedStepCount = await AsyncStorage.getItem('stepCount');
      if (storedStepCount !== null) {
        setStepCount(parseInt(storedStepCount));
      }
    } catch (error) {
      console.error('Error loading step count from storage: ', error);
    }
  };

  const saveStepCountToStorage = async () => {
    try {
      await AsyncStorage.setItem('stepCount', String(StepCount));
    } catch (error) {
      console.error('Error saving step count to storage: ', error);
    }
  };

  const resetStepCountIfNecessary = async () => {
    try {
      const lastResetTime = await AsyncStorage.getItem('lastResetTime');
      if (lastResetTime) {
        const timeDifference = Date.now() - parseInt(lastResetTime);
        const millisecondsIn24Hours = 24 * 60 * 60 * 1000;
        if (timeDifference >= millisecondsIn24Hours) {
          setStepCount(0);
          await AsyncStorage.setItem('lastResetTime', String(Date.now()));
        }
      } else {
        await AsyncStorage.setItem('lastResetTime', String(Date.now()));
      }
    } catch (error) {
      console.error('Error resetting step count: ', error);
    }
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const distance = (StepCount / 1300).toFixed(4);
  const caloriesBurnt = (distance * 60).toFixed(4);

  return (
    <View
      style={[
        styles.container,
        {
          width: windowWidth,
          height: windowHeight,
          backgroundColor: theme.mainBackgroundColor,
        },
      ]}>
      <View style={styles.header}>
        <Text style={[styles.headingText, { color: theme.textColor }]}>
          Pedometer Availability: {PedometerAvailability}
        </Text>
      </View>

      <View style={styles.circularProgressContainer}>
        <CircularProgress
          value={StepCount}
          maxValue={6500}
          radius={windowWidth * 0.4}
          textColor={theme.textColor}
          activeStrokeColor={theme.logOutButton}
          inActiveStrokeColor={`${theme.logOutButton}80`}
          inActiveStrokeOpacity={0.5}
          inActiveStrokeWidth={10}
          activeStrokeWidth={10}
          title={'Step Count'}
          titleColor={theme.logOutButton}
          titleStyle={{ fontWeight: 'bold' }}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.infoText, { color: theme.textColor }]}>
          Target: 6500 steps (5kms)
        </Text>
        <Text style={[styles.infoText, { color: theme.textColor }]}>
          Distance Covered: {distance} km
        </Text>
        <Text style={[styles.infoText, { color: theme.textColor }]}>
          Calories Burnt: {caloriesBurnt}
        </Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 0,
  },
  header: {
    marginBottom: 20,
  },
  headingText: {
    fontSize: 20,
    fontWeight: '800',
  },
  circularProgressContainer: {
    marginBottom: 40,
  },
  infoContainer: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 10,
  },
});
