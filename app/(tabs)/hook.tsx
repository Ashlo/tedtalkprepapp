import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function HookScreen() {
  const [hookText, setHookText] = useState('');
  const [showGuidelines, setShowGuidelines] = useState(false);
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { from } = useLocalSearchParams();

  const isDark = colorScheme === 'dark';
  const textColor = isDark ? '#ffffff' : '#000000';
  const backgroundColor = isDark ? '#1a1a1a' : '#ffffff';
  const cardBackground = isDark ? '#2a2a2a' : '#f5f5f5';

  const guidelines = [
    "Start with a surprising fact or statistic",
    "Share a personal story that relates to your topic",
    "Ask a thought-provoking question",
    "Create a 'what if' scenario",
    "Use a powerful quote"
  ];

  const handleBack = () => {
    if (from === 'preparation') {
      router.push('/(tabs)/preparation');
    } else {
      router.back();
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {/* Custom Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color={textColor} />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>Opening Hook</Text>
        <Text style={[styles.subtitle, { color: isDark ? '#888' : '#666' }]}>
          Grab your audience's attention in the first 30 seconds
        </Text>
      </View>

      {/* AI Assistant */}
      <TouchableOpacity
        style={[styles.aiCard, { backgroundColor: '#e62b1e' }]}>
        <View style={styles.aiHeader}>
          <Ionicons name="sparkles" size={24} color="#ffffff" />
          <Text style={styles.aiTitle}>Generate Hook with AI</Text>
        </View>
        <Text style={styles.aiDescription}>
          Let AI help you create a compelling opening for your talk
        </Text>
      </TouchableOpacity>

      {/* Input Section */}
      <View style={[styles.inputCard, { backgroundColor: cardBackground }]}>
        <Text style={[styles.inputLabel, { color: textColor }]}>Write your hook</Text>
        <TextInput
          style={[styles.input, { color: textColor, backgroundColor: isDark ? '#1a1a1a' : '#ffffff' }]}
          multiline
          placeholder="Type your opening hook here..."
          placeholderTextColor={isDark ? '#888' : '#666'}
          value={hookText}
          onChangeText={setHookText}
        />
        <TouchableOpacity style={styles.enhanceButton}>
          <Text style={styles.enhanceButtonText}>Enhance with AI</Text>
        </TouchableOpacity>
      </View>

      {/* Guidelines */}
      <TouchableOpacity 
        style={[styles.guidelinesCard, { backgroundColor: cardBackground }]}
        onPress={() => setShowGuidelines(!showGuidelines)}>
        <View style={styles.guidelinesHeader}>
          <Ionicons name="information-circle-outline" size={24} color="#e62b1e" />
          <Text style={[styles.guidelinesTitle, { color: textColor }]}>TED Guidelines</Text>
          <Ionicons 
            name={showGuidelines ? "chevron-up" : "chevron-down"} 
            size={24} 
            color="#e62b1e" 
          />
        </View>
        {showGuidelines && (
          <Animated.View entering={FadeInDown}>
            {guidelines.map((guideline, index) => (
              <View key={index} style={styles.guidelineItem}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#e62b1e" />
                <Text style={[styles.guidelineText, { color: textColor }]}>{guideline}</Text>
              </View>
            ))}
          </Animated.View>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    padding: 16,
    paddingTop: 60, // Adjust for status bar
  },
  header: {
    padding: 24,
    paddingTop: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  aiCard: {
    margin: 24,
    padding: 20,
    borderRadius: 16,
    marginTop: 0,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  aiDescription: {
    color: '#ffffff',
    fontSize: 16,
  },
  inputCard: {
    margin: 24,
    padding: 20,
    borderRadius: 16,
    marginTop: 0,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#e62b1e',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  enhanceButton: {
    backgroundColor: '#e62b1e',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  enhanceButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  guidelinesCard: {
    margin: 24,
    padding: 20,
    borderRadius: 16,
    marginTop: 0,
  },
  guidelinesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  guidelinesTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginLeft: 8,
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  guidelineText: {
    fontSize: 16,
    flex: 1,
  },
}); 