import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function StructureScreen() {
  const [selectedStructure, setSelectedStructure] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const colorScheme = useColorScheme();
  const router = useRouter();

  const isDark = colorScheme === 'dark';
  const textColor = isDark ? '#ffffff' : '#000000';
  const backgroundColor = isDark ? '#1a1a1a' : '#ffffff';
  const cardBackground = isDark ? '#2a2a2a' : '#f5f5f5';

  const structures = [
    {
      id: 'classic',
      title: 'Classic TED Structure',
      description: 'Hook → Problem → Solution → Call to Action',
      icon: 'grid-outline',
    },
    {
      id: 'story',
      title: 'Story-Driven',
      description: 'Personal Journey → Lesson → Universal Application',
      icon: 'book-outline',
    },
    {
      id: 'problem',
      title: 'Problem-Solution',
      description: 'Problem → Impact → Solution → Benefits',
      icon: 'bulb-outline',
    },
  ];

  const timeBlocks = [
    { id: 'opening', title: 'Opening', duration: '2-3 min' },
    { id: 'main', title: 'Main Content', duration: '10-12 min' },
    { id: 'closing', title: 'Closing', duration: '1-2 min' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {/* Custom Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={textColor} />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>Talk Structure</Text>
        <Text style={[styles.subtitle, { color: isDark ? '#888' : '#666' }]}>
          Build a compelling narrative flow
        </Text>
      </View>

      {/* Time Distribution */}
      <View style={[styles.timelineCard, { backgroundColor: cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Time Distribution</Text>
        <View style={styles.timeline}>
          {timeBlocks.map((block, index) => (
            <View key={block.id} style={styles.timeBlock}>
              <View style={[styles.timeIndicator, { backgroundColor: '#e62b1e' }]}>
                <Text style={styles.timeText}>{block.duration}</Text>
              </View>
              <Text style={[styles.blockTitle, { color: textColor }]}>{block.title}</Text>
              {index < timeBlocks.length - 1 && (
                <View style={[styles.connector, { backgroundColor: '#e62b1e' }]} />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Structure Templates */}
      <View style={styles.templates}>
        {structures.map((structure) => (
          <TouchableOpacity
            key={structure.id}
            style={[
              styles.templateCard,
              { backgroundColor: cardBackground },
              selectedStructure === structure.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedStructure(structure.id)}>
            <Ionicons
              name={structure.icon as any}
              size={28}
              color={selectedStructure === structure.id ? '#ffffff' : '#e62b1e'}
            />
            <View style={styles.templateInfo}>
              <Text
                style={[
                  styles.templateTitle,
                  { color: selectedStructure === structure.id ? '#ffffff' : textColor },
                ]}>
                {structure.title}
              </Text>
              <Text
                style={[
                  styles.templateDescription,
                  {
                    color: selectedStructure === structure.id ? '#ffffff' : isDark ? '#888' : '#666',
                  },
                ]}>
                {structure.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* AI Assistant Button */}
      <TouchableOpacity style={[styles.aiButton, { backgroundColor: '#e62b1e' }]}>
        <Ionicons name="sparkles" size={24} color="#ffffff" />
        <Text style={styles.aiButtonText}>Get AI Suggestions</Text>
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
  timelineCard: {
    margin: 24,
    padding: 20,
    borderRadius: 16,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  timeline: {
    paddingVertical: 20,
  },
  timeBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeIndicator: {
    width: 80,
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  timeText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  blockTitle: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  connector: {
    position: 'absolute',
    left: 40,
    top: 30,
    width: 2,
    height: 40,
  },
  templates: {
    padding: 24,
    paddingTop: 0,
    gap: 16,
  },
  templateCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    gap: 16,
  },
  selectedCard: {
    backgroundColor: '#e62b1e',
  },
  templateInfo: {
    flex: 1,
  },
  templateTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 14,
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