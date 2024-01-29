import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>About Our Fitness App</Text>
      <Text style={styles.description}>
        Welcome to our fitness app! We are dedicated to helping you achieve
        your fitness goals through innovative features and personalized
        recommendations.
      </Text>
      <Text style={styles.description}>
        Our app features include:
      </Text>
      <Text style={styles.feature}>1. Smart Camera Feature:</Text>
      <Text style={styles.featureDescription}>
        Our smart camera feature allows you to click or upload a photo of any
        gym machine, and it will provide information on how to use the machine,
        its benefits, and recommend exercises you can perform using it.
      </Text>
      <Text style={styles.feature}>2. Diet Recommendation:</Text>
      <Text style={styles.featureDescription}>
        Receive personalized diet recommendations tailored to your fitness
        goals and dietary preferences. Whether you're looking to lose weight,
        build muscle, or maintain a healthy lifestyle, our app provides
        nutrition guidance to support your journey.
      </Text>
      <Text style={styles.feature}>3. Exercise Recommendation:</Text>
      <Text style={styles.featureDescription}>
        Get customized exercise recommendations based on your fitness level,
        preferences, and goals. Whether you're a beginner or an experienced
        athlete, our app offers a variety of workout routines to help you
        stay motivated and achieve results.
      </Text>
      <Text style={styles.contact}>For any questions or feedback, please contact us at support@fitnessapp.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
  },
  header: {
    marginTop: 100,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFF',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#FFFF',
  },
  feature: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#FFFF',
  },
  featureDescription: {
    fontSize: 16,
    marginLeft: 15,
    marginBottom: 10,
    color: '#FFFF',
  },
  contact: {
    fontSize: 14,
    marginTop: 30,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
  },
});

export default AboutUsScreen;
