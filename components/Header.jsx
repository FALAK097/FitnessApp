import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';

export default function Header({ username, onPressAvatar, onPressCamera }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={styles.iconContainer}>
        <Octicons name="three-bars" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.usernameText}>
        Welcome, <Text style={styles.highlightedText}>{username}</Text>
      </Text>

      <TouchableOpacity style={styles.avatarContainer} onPress={onPressAvatar}>
        <Octicons name="person" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.cameraContainer} onPress={onPressCamera}>
        <Octicons name="device-camera" size={24} color="gray" />
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
  iconContainer: {
    height: 45,
    width: 45,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffffc3',
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
  avatarContainer: {
    marginRight: 15,
  },
  cameraContainer: {
    backgroundColor: '#c0c0c0',
    height: 45,
    width: 45,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
});
