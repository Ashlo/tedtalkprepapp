import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function TopicScreen() {
  const [topic, setTopic] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What's your talk about?</Text>
        <Text style={styles.subtitle}>
          Share the main topic or theme of your TED talk
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="e.g., The Future of AI"
          value={topic}
          onChangeText={setTopic}
          multiline
          maxLength={100}
        />
        <Text style={styles.characterCount}>{topic.length}/100</Text>
      </View>

      <View style={styles.suggestions}>
        <Text style={styles.suggestionsTitle}>Popular Topics</Text>
        {['Technology', 'Climate Change', 'Education', 'Mental Health'].map(
          (suggestion) => (
            <TouchableOpacity
              key={suggestion}
              style={styles.suggestionChip}
              onPress={() => setTopic(suggestion)}>
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          )
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !topic && styles.buttonDisabled]}
          disabled={!topic}
          onPress={() => router.push('/(onboarding)/goals')}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
  },
  header: {
    marginTop: 64,
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  inputContainer: {
    marginBottom: 32,
  },
  input: {
    fontSize: 18,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e62b1e',
    borderRadius: 12,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  characterCount: {
    textAlign: 'right',
    color: '#666666',
    marginTop: 8,
  },
  suggestions: {
    marginBottom: 32,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  suggestionChip: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 16,
    color: '#333333',
  },
  footer: {
    marginTop: 'auto',
  },
  button: {
    backgroundColor: '#e62b1e',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});