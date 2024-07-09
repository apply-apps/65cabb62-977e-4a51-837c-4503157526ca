// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, Button, View } from 'react-native';
import axios from 'axios';

export default function App() {
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState('');
  const [style, setStyle] = useState('');
  const [greeting, setGreeting] = useState('');

  const handleGenerateGreeting = async () => {
    try {
      const response = await axios.post('http://p.appply.xyz:3300/chatgpt', {
        messages: [
          { role: 'system', content: 'You are a helpful assistant. Please provide answers for given requests.' },
          { role: 'user', content: `Создай поздравление для ${recipient} по случаю ${occasion} в стиле ${style}.` }
        ],
        model: 'gpt-4o',
      });

      const resultString = response.data.response;
      setGreeting(resultString);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Создание Поздравлений</Text>
        <View style={styles.box}>
          <TextInput
            style={styles.input}
            placeholder="Кому поздравление"
            value={recipient}
            onChangeText={setRecipient}
          />
          <TextInput
            style={styles.input}
            placeholder="По какому поводу"
            value={occasion}
            onChangeText={setOccasion}
          />
          <TextInput
            style={styles.input}
            placeholder="В каком стиле"
            value={style}
            onChangeText={setStyle}
          />
          <Button title="Создать Поздравление" onPress={handleGenerateGreeting} />
        </View>
        {greeting && (
          <View style={styles.box}>
            <Text style={styles.greeting}>{greeting}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 10,
    width: '100%',
  },
  box: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: 20,
    width: '100%',
  },
  greeting: {
    fontSize: 18,
  },
});