import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Card } from 'react-native-elements';
import { useTheme } from '../context/ThemeContext';

export default function MachineDetectInstruction() {
  const { theme } = useTheme();

  return (
    <View>
      <Card
        title="Beginner Level"
        containerStyle={[
          styles.instructionCardContainer,
          {
            backgroundColor: theme.backgroundColor,
          },
        ]}>
        <Text style={{ fontSize: 13, fontWeight: '500' }}>
          Step 1: Select image from media by clicking
          <TouchableOpacity activeOpacity={0.6} style={styles.buttonStyle}>
            <Text
              style={[
                styles.buttonTitleStyle,
                {
                  color: theme.textColor,
                },
              ]}>
              {' '}
              PICK AN IMAGE{' '}
            </Text>
          </TouchableOpacity>{' '}
        </Text>
        <Text style={{ fontSize: 13, fontWeight: '500' }}>
          Step 2: Upload image to server by clicking
          <TouchableOpacity activeOpacity={0.6} style={styles.buttonStyle}>
            <Text
              style={[
                styles.buttonTitleStyle,
                {
                  color: theme.textColor,
                },
              ]}>
              {' '}
              DETECT MACHINE{' '}
            </Text>
          </TouchableOpacity>
        </Text>
        <Text style={{ fontSize: 13, fontWeight: '500' }}>
          Step 3: Follow the instruction provided on machine
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#F1BE48',
    borderRadius: 7.5,
    borderColor: 'grey',
    borderBottomWidth: 3,
    elevation: 11,
  },
  buttonTitleStyle: {
    color: 'white',
    fontWeight: '600',
  },
  instructionCardContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 20,
    elevation: 10,
  },
});
