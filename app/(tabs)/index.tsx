import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function PrepareScreen() {
  const [showAITips, setShowAITips] = useState(false);
  const colorScheme = useColorScheme();
  const router = useRouter();

  const isDark = colorScheme === 'dark';
  const textColor = isDark ? '#ffffff' : '#000000';
  const backgroundColor = isDark ? '#1a1a1a' : '#ffffff';
  const cardBackground = isDark ? '#2a2a2a' : '#f5f5f5';

  const sections = [
    {
      id: 'hook',
      title: 'Opening Hook',
      description: 'Craft a powerful beginning',
      icon: 'flash-outline' as const,
      progress: 0,
    },
    {
      id: 'structure',
      title: 'Talk Structure',
      description: 'Organize your ideas',
      icon: 'git-branch-outline' as const,
      progress: 0,
    },
    {
      id: 'storytelling',
      title: 'Storytelling',
      description: 'Engage with narratives',
      icon: 'book-outline' as const,
      progress: 0,
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: textColor }]}>Ideate Your Talk</Text>
          <Text style={[styles.subtitle, { color: isDark ? '#888' : '#666' }]}>
            Take your ideas and make them shine
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.aiButton, { backgroundColor: '#e62b1e' }]}
          onPress={() => setShowAITips(!showAITips)}>
          <Ionicons name="bulb" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* AI Assistant Tips */}
      {showAITips && (
        <Animated.View
          entering={FadeInDown}
          style={[styles.aiTipsCard, { backgroundColor: '#e62b1e' }]}>
          <View style={styles.aiHeader}>
            <Ionicons name="sparkles" size={24} color="#ffffff" />
            <Text style={styles.aiTitle}>AI Writing Assistant</Text>
          </View>
          <Text style={styles.aiDescription}>
            "Try starting with a surprising statistic or a personal story that relates to your topic. This helps grab attention immediately."
          </Text>
          <TouchableOpacity style={styles.generateButton}>
            <Text style={styles.generateButtonText}>Generate More Tips</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Main Sections */}
      <View style={styles.sections}>
        {sections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={[styles.sectionCard, { backgroundColor: cardBackground }]}
            onPress={() => {
              if (section.id === 'hook') {
                router.push('/(tabs)/hook');
              } else if (section.id === 'structure') {
                router.push('/(tabs)/structure');
              } else if (section.id === 'storytelling') {
                router.push('/(tabs)/storytelling');
              }
            }}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Ionicons name={section.icon} size={24} color="#e62b1e" />
              </View>
              <View style={styles.sectionInfo}>
                <Text style={[styles.sectionTitle, { color: textColor }]}>
                  {section.title}
                </Text>
                <Text style={[styles.sectionDescription, { color: isDark ? '#888' : '#666' }]}>
                  {section.description}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#e62b1e" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.quickActionCard, { backgroundColor: cardBackground }]}>
          <Ionicons name="mic-outline" size={32} color="#e62b1e" />
          <Text style={[styles.quickActionText, { color: textColor }]}>
            Practice Mode
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickActionCard, { backgroundColor: cardBackground }]}>
          <Ionicons name="analytics-outline" size={32} color="#e62b1e" />
          <Text style={[styles.quickActionText, { color: textColor }]}>
            Analysis
          </Text>
        </TouchableOpacity>
      </View>

      {/* Start Button */}
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Begin Preparation</Text>
        <Ionicons name="arrow-forward" size={20} color="#ffffff" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  aiButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  aiTipsCard: {
    margin: 24,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
    lineHeight: 24,
    marginBottom: 16,
  },
  generateButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  generateButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  sections: {
    padding: 24,
    gap: 16,
  },
  sectionCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2.84,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(230, 43, 30, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sectionInfo: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
  },
  quickActions: {
    flexDirection: 'row',
    padding: 24,
    gap: 16,
  },
  quickActionCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2.84,
    elevation: 3,
  },
  quickActionText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#e62b1e',
    margin: 24,
    marginTop: 8,
    padding: 16,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});