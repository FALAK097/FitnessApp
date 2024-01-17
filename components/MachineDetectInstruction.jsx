import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Card } from 'react-native-elements';


export default function MachineDetectInstruction() {
  return (
    <View >
        <Card title="Beginner Level" containerStyle={styles.instructionCardContainer}>
          <Text style={{fontSize: 13,fontWeight:'500'}}>Step 1: Select image from media by clicking "PICK AN IMAGE" button</Text>
          <Text style={{fontSize: 13,fontWeight:'500'}}>Step 2: Upload image to server by clicking "DETECT MACHINE" button</Text>
          <Text style={{fontSize: 13,fontWeight:'500'}}>Step 3: Follow the instruction provided on machine</Text>
  
        </Card>
    </View>
  )
}


const styles = StyleSheet.create({

    instructionCardContainer: {
      width: '100%',
      margin: 5,
      marginTop: 30,
      backgroundColor: 'lightgray',
      borderRadius: 20,
      borderColor: 'grey',
      borderBottomWidth: 4,
      elevation: 10,
    },

  });