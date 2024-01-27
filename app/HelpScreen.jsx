import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function HelpSection() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Help Section</Text>
        <Text style={styles.description}>
          Welcome to our help section! Here, you'll find information to help you make the most out of our smart camera feature and other app functionalities.
        </Text>
        
        <SectionHeader title="Smart Camera" />
        <Text style={styles.description}>
          Our smart camera feature allows you to take photos of gym machines and receive exercise recommendations and information on how to perform those exercises. Here's how to use it:
        </Text>
        <Text style={styles.listItem}>1. Open the app and navigate to the smart camera feature.</Text>
        <Text style={styles.listItem}>2. Take a clear photo of the gym machine you're interested in.</Text>
        <Text style={styles.listItem}>3. Wait for the app to detect the machine and provide exercise recommendations.</Text>
        <Text style={styles.listItem}>4. Review the exercise details and follow the instructions to perform the exercise correctly.</Text>
        
        <SectionHeader title="Diet Recommendations" />
        <Text style={styles.description}>
          In addition to exercise recommendations, our app also provides diet recommendations to help you achieve your fitness goals. You can access these recommendations through the diet section of the app.
        </Text>
        
        <SectionHeader title="Exercise Recommendations" />
        <Text style={styles.description}>
          Aside from the smart camera feature, our app offers exercise recommendations tailored to your fitness level and goals. These recommendations can be found in the exercise section of the app.
        </Text>
        
        <SectionHeader title="Contact Us" />
        <Text style={styles.description}>
          If you have any questions or encounter any issues while using our app, feel free to contact our support team:
        </Text>
        <Text style={styles.contact}>Email: support@fithub.com</Text>
        <Text style={styles.contact}>Phone: 1-800-YOUR-FIT</Text>
        <Text style={styles.contact}>Visit Us: 123 Fitness Ave, Virar, Bhiwandi, Kalwa, INDIA</Text>
      </View>
    </ScrollView>
  );
}

function SectionHeader({ title }) {
  return <Text style={styles.sectionHeader}>{title}</Text>;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    paddingVertical: 20,
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 100,
    color: '#FFFFFF', 
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#CCCCCC', 
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#FFFFFF', 
  },
  listItem: {
    marginLeft: 20,
    fontSize: 16,
    color: '#CCCCCC', 
  },
  contact: {
    fontSize: 16,
    marginBottom: 5,
    color: '#CCCCCC', 
  },
});

export default HelpSection;
