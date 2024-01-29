import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../components/ThemeContext';

const AboutUsScreen = () => {
  const { theme } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.mainBackgroundColor }]}>
      <Text style={[styles.header, { color: theme.textColor }]}>About Our SMART CAMERA based Fitness App</Text>
      <Text style={[styles.description, { color: theme.textColor }]}>
        Welcome to our fitness app! We are dedicated to helping you achieve
        your fitness goals through innovative features and personalized
        recommendations.
      </Text>
      <Text style={[styles.description, { color: theme.textColor }]}>
        Our app features include:
      </Text>
      <Text style={[styles.feature, { color: theme.textColor }]}>1. Smart Camera Feature:</Text>
      <Text style={[styles.featureDescription, { color: theme.textColor }]}>
        Our smart camera feature allows you to click or upload a photo of any
        gym machine, and it will provide information on how to use the machine,
        its benefits, and recommend exercises you can perform using it.
      </Text>
      <Text style={[styles.feature, { color: theme.textColor }]}>2. Diet Recommendation:</Text>
      <Text style={[styles.featureDescription, { color: theme.textColor }]}>
        Receive personalized diet recommendations tailored to your fitness
        goals and dietary preferences. Whether you're looking to lose weight,
        build muscle, or maintain a healthy lifestyle, our app provides
        nutrition guidance to support your journey.
      </Text>
      <Text style={[styles.feature, { color: theme.textColor }]}>3. Exercise Recommendation:</Text>
      <Text style={[styles.featureDescription, { color: theme.textColor }]}>
        Get customized exercise recommendations based on your fitness level,
        preferences, and goals. Whether you're a beginner or an experienced
        athlete, our app offers a variety of workout routines to help you
        stay motivated and achieve results.
      </Text>
      <Text style={[styles.contact, { color: theme.textColor }]}>For any questions or feedback, please contact us at support@fithub.com</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  feature: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  featureDescription: {
    fontSize: 16,
    marginLeft: 15,
    marginBottom: 10,
  },
  contact: {
    fontSize: 14,
    marginTop: 30,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
});

export default AboutUsScreen;
