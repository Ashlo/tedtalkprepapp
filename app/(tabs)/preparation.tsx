import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function PreparationScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const steps = [
    {
      id: 'hook',
      title: 'Opening Hook',
      description: 'Grab attention in first 30 seconds',
      icon: 'flash-outline' as const,
      time: '15 mins',
      status: 'not-started',
    },
    {
      id: 'structure',
      title: 'Talk Structure',
      description: 'Organize your key points',
      icon: 'git-branch-outline' as const,
      time: '20 mins',
      status: 'not-started',
    },
    {
      id: 'storytelling',
      title: 'Storytelling',
      description: 'Craft your narrative',
      icon: 'book-outline' as const,
      time: '25 mins',
      status: 'not-started',
    },
    {
      id: 'practice',
      title: 'Practice Session',
      description: 'Rehearse and refine',
      icon: 'mic-outline' as const,
      time: '30 mins',
      status: 'not-started',
    }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#ffffff' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#ffffff' : '#000000' }]}>
          Preparation Roadmap
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#888' : '#666' }]}>
          Estimated time: 90 minutes
        </Text>
      </View>

      <View style={styles.steps}>
        {steps.map((step, index) => (
          <TouchableOpacity
            key={step.id}
            style={[
              styles.stepCard,
              { backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5' }
            ]}
            onPress={() => router.push({
              pathname: step.id as any,
              params: { from: 'preparation' }
            })}>
            <View style={styles.stepHeader}>
              <View style={styles.stepIcon}>
                <Ionicons name={step.icon} size={24} color="#e62b1e" />
              </View>
              <View style={styles.stepInfo}>
                <Text style={[styles.stepTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
                  {step.title}
                </Text>
                <Text style={[styles.stepDescription, { color: isDark ? '#888' : '#666' }]}>
                  {step.description}
                </Text>
              </View>
              <View style={styles.stepMeta}>
                <Text style={styles.stepTime}>{step.time}</Text>
                <Ionicons name="chevron-forward" size={20} color="#e62b1e" />
              </View>
            </View>
            {index < steps.length - 1 && (
              <View style={styles.connector} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.aiButton}
        onPress={() => {}}>
        <Ionicons name="sparkles" size={24} color="#ffffff" />
        <Text style={styles.aiButtonText}>Get AI Recommendations</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  steps: {
    padding: 24,
    gap: 16,
  },
  stepCard: {
    borderRadius: 16,
    padding: 20,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(230, 43, 30, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
  },
  stepMeta: {
    alignItems: 'flex-end',
  },
  stepTime: {
    color: '#e62b1e',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  connector: {
    position: 'absolute',
    left: 44,
    top: 68,
    width: 2,
    height: 40,
    backgroundColor: 'rgba(230, 43, 30, 0.2)',
  },
  aiButton: {
    backgroundColor: '#e62b1e',
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