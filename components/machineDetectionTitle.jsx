import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function MachineDetectionTitle() {
  return (
    <View style={styles.container}>
        <Text style={{fontSize:30,fontWeight: '500', color: 'grey'}}>Machine Detection</Text>
        <Text style={{fontSize:14,fontWeight: '500', color: 'grey'}}>Powered by FitHub</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      
    },
  });