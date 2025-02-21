import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function StorytellingScreen() {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [storyText, setStoryText] = useState('');
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { from } = useLocalSearchParams();
  const isDark = colorScheme === 'dark';
  const textColor = isDark ? '#ffffff' : '#000000';
  const backgroundColor = isDark ? '#1a1a1a' : '#ffffff';
  const cardBackground = isDark ? '#2a2a2a' : '#f5f5f5';

  const storyElements = [
    {
      id: 'character',
      title: 'Main Character',
      description: 'Who is the story about?',
      icon: 'person-outline',
      prompt: 'Introduce the protagonist of your story...',
    },
    {
      id: 'conflict',
      title: 'Central Conflict',
      description: 'What challenge or obstacle?',
      icon: 'flash-outline',
      prompt: 'Describe the main challenge...',
    },
    {
      id: 'change',
      title: 'Transformation',
      description: 'What changed or was learned?',
      icon: 'leaf-outline',
      prompt: 'Explain the transformation...',
    },
    {
      id: 'connection',
      title: 'Connection',
      description: 'Link to your main message',
      icon: 'link-outline',
      prompt: 'Connect to your talk\'s theme...',
    },
  ];

  const tips = [
    "Use vivid, sensory details",
    "Show, don't tell",
    "Create emotional resonance",
    "Keep it relevant to your message",
    "Practice authentic delivery"
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
        <Text style={[styles.title, { color: textColor }]}>Storytelling</Text>
        <Text style={[styles.subtitle, { color: isDark ? '#888' : '#666' }]}>
          Craft a memorable narrative
        </Text>
      </View>

      {/* Story Builder */}
      <View style={styles.storyBuilder}>
        {storyElements.map((element, index) => (
          <TouchableOpacity
            key={element.id}
            style={[
              styles.elementCard,
              { backgroundColor: cardBackground },
              activeStep === element.id && styles.activeCard,
            ]}
            onPress={() => setActiveStep(element.id)}>
            <View style={styles.elementHeader}>
              <View style={[styles.elementIcon, activeStep === element.id && styles.activeIcon]}>
                <Ionicons
                  name={element.icon as any}
                  size={24}
                  color={activeStep === element.id ? '#ffffff' : '#e62b1e'}
                />
              </View>
              <View style={styles.elementInfo}>
                <Text
                  style={[
                    styles.elementTitle,
                    { color: activeStep === element.id ? '#ffffff' : textColor },
                  ]}>
                  {element.title}
                </Text>
                <Text
                  style={[
                    styles.elementDescription,
                    {
                      color: activeStep === element.id ? '#ffffff' : isDark ? '#888' : '#666',
                    },
                  ]}>
                  {element.description}
                </Text>
              </View>
              <Text style={[styles.stepNumber, { color: isDark ? '#888' : '#666' }]}>
                {index + 1}
              </Text>
            </View>
            {activeStep === element.id && (
              <Animated.View entering={FadeInDown} style={styles.inputSection}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: '#ffffff',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  ]}
                  placeholder={element.prompt}
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  multiline
                  value={storyText}
                  onChangeText={setStoryText}
                />
              </Animated.View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Storytelling Tips */}
      <View style={[styles.tipsCard, { backgroundColor: cardBackground }]}>
        <View style={styles.tipsHeader}>
          <Ionicons name="bulb-outline" size={24} color="#e62b1e" />
          <Text style={[styles.tipsTitle, { color: textColor }]}>Pro Tips</Text>
        </View>
        {tips.map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <View style={styles.tipBullet}>
              <Text style={styles.tipBulletText}>•</Text>
            </View>
            <Text style={[styles.tipText, { color: isDark ? '#888' : '#666' }]}>{tip}</Text>
          </View>
        ))}
      </View>

      {/* AI Assistant */}
      <TouchableOpacity style={[styles.aiButton, { backgroundColor: '#e62b1e' }]}>
        <Ionicons name="sparkles" size={24} color="#ffffff" />
        <Text style={styles.aiButtonText}>Enhance with AI</Text>
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
    paddingTop: 60,
  },
  header: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  storyBuilder: {
    padding: 24,
    paddingTop: 0,
    gap: 16,
  },
  elementCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  activeCard: {
    backgroundColor: '#e62b1e',
  },
  elementHeader: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    gap: 16,
  },
  elementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(230, 43, 30, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  elementInfo: {
    flex: 1,
  },
  elementTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  elementDescription: {
    fontSize: 14,
  },
  stepNumber: {
    fontSize: 20,
    fontWeight: '600',
    opacity: 0.5,
  },
  inputSection: {
    padding: 20,
    paddingTop: 0,
  },
  input: {
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  tipsCard: {
    margin: 24,
    padding: 20,
    borderRadius: 16,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipBullet: {
    width: 20,
    alignItems: 'center',
  },
  tipBulletText: {
    color: '#e62b1e',
    fontSize: 20,
  },
  tipText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    margin: 24,
    padding: 16,
    borderRadius: 30,
  },
  aiButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 