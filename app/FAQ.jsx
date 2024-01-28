import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import FAQComponent from '../components/FAQcomponent';

const frequentlyAskedQuestions = [
    {
        question: 'How to access Smart Camera?',
        answer: 'On the top right corner of the home screen you will see a camera icon (just beside your avatar icon) click on it.'
    },
    {
        question: 'How to use Smart Camera?',
        answer: 'After accessing the smart camera you will find a button (Pick an image) click on it. Select the image you want to identify. After that click on Detect Machine button and get the result.'
    }
]

export default function FAQ() {
  return (
    <View>
    {frequentlyAskedQuestions.map((faq,index)=><FAQComponent key={index.toString()} title={faq.question} details={faq.answer}/>)}
    </View>
  )
}

const styles = StyleSheet.create({})