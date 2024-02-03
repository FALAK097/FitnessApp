import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';

const CommonHeader = ({ title, navigation, style }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.header, style]}>
      <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
        <Ionicons
          name="arrow-back"
          size={hp(4)}
          style={{ color: theme.textColor, marginLeft: 5 }}
        />
      </TouchableOpacity>
      <Text style={[styles.headerText, { color: theme.textColor }]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  headerText: {
    fontSize: hp(3),
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});

export default CommonHeader;
