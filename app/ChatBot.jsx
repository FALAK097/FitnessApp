import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import CommonHeader from '../components/CommonHeader';

const ChatBot = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { theme } = useTheme();
  const scrollViewRef = useRef();

  const LANGUAGE_MODEL_API_KEY = process.env.EXPO_PUBLIC_LANGUAGE_MODEL_API_KEY;
  const LANGUAGE_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta3/models/chat-bison-001:generateMessage?key=${LANGUAGE_MODEL_API_KEY}`;

  const addMessage = (author, content) => {
    setMessages((prevMessages) => [...prevMessages, { author, content }]);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const getResponse = async () => {
    if (!text.trim()) return;

    addMessage('You', text);
    setText('');
    setIsLoading(true);

    const payload = {
      prompt: { messages: [{ content: text }] },
      temperature: 0.1,
      candidate_count: 1,
    };

    try {
      const response = await fetch(LANGUAGE_MODEL_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to get response from language model.');
      }

      const data = await response.json();
      addMessage('Bot', data.candidates[0].content);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error',
        'Failed to get response from language model. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.mainBackgroundColor },
      ]}>
      <CommonHeader
        title="AI ChatBot"
        navigation={navigation}
        style={{ marginRight: 20 }}
      />
      <View style={styles.chatContainer}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={[
            styles.contentContainer,
            { backgroundColor: theme.backgroundColor },
          ]}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={
                message.author === 'You'
                  ? styles.userMessageContainer
                  : styles.botMessageContainer
              }>
              <Text
                style={
                  message.author === 'You'
                    ? styles.userMessage
                    : styles.botMessage
                }>
                {message.author === 'You' ? 'You: ' : 'FitHub GPT: '}
                {message.content}
              </Text>
            </View>
          ))}
          {isLoading && (
            <View style={styles.botMessageContainer}>
              <Text style={styles.botMessage}>Typing...</Text>
            </View>
          )}
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled>
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: theme.backgroundColor },
            ]}>
            <TextInput
              style={[
                styles.textInput,
                { backgroundColor: theme.backgroundColor },
              ]}
              value={text}
              onChangeText={setText}
              placeholder="Type your message..."
            />
            <TouchableOpacity style={styles.sendButton} onPress={getResponse}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  chatContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  userMessageContainer: {
    marginBottom: 10,
    alignSelf: 'flex-end',
    maxWidth: '80%',
    backgroundColor: '#F1BE48',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  botMessageContainer: {
    marginBottom: 10,
    alignSelf: 'flex-start',
    maxWidth: '80%',
    backgroundColor: '#4CAF50', //#2196F3
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  userMessage: {
    color: 'black',
    fontWeight: 'bold',
  },
  botMessage: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'white',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#F1BE48',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'black',
    fontWeight: '900',
  },
});

export default ChatBot;
