import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

export default function Header({ name, onPressAvatar, onPressCamera }) {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={[
          styles.icon,
          { backgroundColor: theme.drawerBackgroundColor, marginRight: 5 },
        ]}>
        <Octicons name="three-bars" size={24} color={theme.textColor} />
      </TouchableOpacity>

      <Text style={[styles.usernameText, { color: theme.textColor }]}>
        Welcome, <Text style={styles.highlightedText}>{name}</Text>
      </Text>

      <TouchableOpacity
        style={[styles.icon, { backgroundColor: theme.drawerBackgroundColor }]}
        onPress={onPressAvatar}>
        <Octicons name="person" size={24} color={theme.textColor} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.icon,
          { backgroundColor: theme.drawerBackgroundColor, marginLeft: 5 },
        ]}
        onPress={onPressCamera}>
        <Octicons name="device-camera" size={24} color={theme.textColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 16,
  },
  icon: {
    height: 45,
    width: 45,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  usernameText: {
    fontSize: 22,
    flex: 1,
    marginRight: 80,
    textAlign: 'center',
  },
  highlightedText: {
    color: '#F1BE48',
  },
});
