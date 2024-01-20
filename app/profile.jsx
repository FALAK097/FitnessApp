import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import DarkModeSwitch from "../components/DarkModeSwitch";
import { useTheme } from "../components/ThemeContext";

export default function Profile() {
  const { theme } = useTheme();

  return (
    <View style={[styles.mainContainer, {backgroundColor: theme.mainBackgroundColor,}]}>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Image
            style={styles.profileImage}
            source={require('../assets/images/avatar.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.changeAvatarText}>Tap to change avatar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <TouchableOpacity style={[styles.button, { 
            backgroundColor: theme.backgroundColor 
            }]}>
          <Text style={[styles.buttonText,{
            color: theme.textColor
          }]}>Profile 👤</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.buttonText,{
            color: theme.textColor
          }]}>Theme 🌓</Text>
          <DarkModeSwitch />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.buttonText,{
            color: theme.textColor
          }]}>Help ❓</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.buttonText}>Logout ❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 10,
  },
  profileImage: {
    height: 200,
    width: 200,
  },
  changeAvatarText: {
    fontSize: 14,
    color: '#777',
  },
  card: {
    width: '94%',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    padding: 15,
    marginBottom: 10,
    width: '100%',
    alignItems: 'flex-start',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 'auto', // Pushes the button to the bottom
    marginBottom: 20,
    backgroundColor: 'brown',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    padding: 15,
    width: '94%',
    alignItems: 'center',
  },
});

