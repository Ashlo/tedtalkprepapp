import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import FAB from '../components/FAB';
import NewTalkModal from '../components/NewTalkModal';
import { runOnJS } from 'react-native-reanimated';
import FeaturedTalks from '../components/FeaturedTalks';
import Avatar from '../components/Avatar';

const COLORS = {
  primary: '#e62b1e',
  secondary: '#000000',
  success: '#10B981',
  warning: '#FBBF24',
  info: '#3B82F6',
  background: {
    light: '#FFFFFF',
    dark: '#000000'
  },
  card: {
    light: '#FFFFFF',
    dark: '#1A1A1A'
  },
  text: {
    light: '#1F2937',
    dark: '#F3F4F6'
  },
  accent: {
    red: '#e62b1e',
    darkRed: '#cc251a',
    gray: '#2a2a2a',
    lightGray: '#f5f5f5'
  }
};

export default function DashboardScreen() {
  const [showNewTalkModal, setShowNewTalkModal] = useState(false);
  const colorScheme = useColorScheme();
  const router = useRouter();
  const isDark = colorScheme === 'dark';
  
  const handleNewTalk = async (topic: string, description: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowNewTalkModal(false);
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push({
      pathname: '/(tabs)/preparation',
      params: { topic, description }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? COLORS.background.dark : COLORS.background.light }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.brandingContainer}>
            <Text style={[styles.tedxLogo, { color: COLORS.primary }]}>TALKx</Text>
            <Text style={[styles.prepareText, { color: isDark ? COLORS.text.dark : COLORS.text.light }]}>
              Prepare
            </Text>
          </View>
          <Avatar 
            size={44}
            image={require('../../assets/images/favicon.png')} // Optional: Add user's profile image
          />
        </View>

        <Text style={[styles.greeting, { color: isDark ? COLORS.text.dark : COLORS.text.light }]}>
          Hello Ash 👋
        </Text>
        
        <View style={styles.bentoGrid}>
          {/* Quick Start Card */}
          <TouchableOpacity 
            style={[styles.card, styles.cardLarge, { 
              backgroundColor: isDark ? COLORS.card.dark : COLORS.card.light,
              borderColor: COLORS.primary,
              borderWidth: 1,
            }]}
            onPress={() => setShowNewTalkModal(true)}>
            <View style={[styles.iconContainer, { backgroundColor: `${COLORS.primary}15` }]}>
              <Ionicons name="rocket-outline" size={32} color={COLORS.primary} />
            </View>
            <Text style={[styles.cardTitle, { color: isDark ? COLORS.text.dark : COLORS.text.light }]}>
              Quick Start
            </Text>
            <Text style={styles.cardDescription}>
              Begin crafting your next talk
            </Text>
          </TouchableOpacity>

          {/* Recent Progress */}
          <TouchableOpacity 
            style={[styles.card, { 
              backgroundColor: isDark ? COLORS.card.dark : COLORS.card.light,
              borderColor: COLORS.success,
              borderWidth: 1,
            }]}
            onPress={() => router.push('/(tabs)/library')}>
            <View style={[styles.iconContainer, { backgroundColor: `${COLORS.success}15` }]}>
              <Ionicons name="time-outline" size={24} color={COLORS.success} />
            </View>
            <Text style={[styles.cardTitle, { color: isDark ? COLORS.text.dark : COLORS.text.light }]}>
              Recent
            </Text>
            <Text style={styles.cardDescription}>3 drafts</Text>
          </TouchableOpacity>

          {/* Practice Stats */}
          <TouchableOpacity 
            style={[styles.card, { 
              backgroundColor: isDark ? COLORS.card.dark : COLORS.card.light,
              borderColor: COLORS.info,
              borderWidth: 1,
            }]}
            onPress={() => router.push('/(tabs)/practice')}>
            <View style={[styles.iconContainer, { backgroundColor: `${COLORS.info}15` }]}>
              <Ionicons name="analytics-outline" size={24} color={COLORS.info} />
            </View>
            <Text style={[styles.cardTitle, { color: isDark ? COLORS.text.dark : COLORS.text.light }]}>
              Practice
            </Text>
            <Text style={styles.cardDescription}>2.5 hours</Text>
          </TouchableOpacity>

          {/* Featured Talk */}
          <TouchableOpacity 
            style={[styles.card, styles.cardWide, { 
              backgroundColor: isDark ? COLORS.card.dark : COLORS.card.light,
              borderColor: COLORS.secondary,
              borderWidth: 1,
            }]}>
            <View style={[styles.iconContainer, { backgroundColor: `${COLORS.secondary}15` }]}>
              <Ionicons name="play-circle-outline" size={24} color={COLORS.secondary} />
            </View>
            <Text style={[styles.cardTitle, { color: isDark ? COLORS.text.dark : COLORS.text.light }]}>
              Featured Talk
            </Text>
            <Text style={styles.cardDescription}>"The Power of Public Speaking"</Text>
          </TouchableOpacity>

          {/* AI Assistant */}
          <TouchableOpacity 
            style={[styles.card, styles.cardWide, { 
              backgroundColor: isDark ? COLORS.card.dark : COLORS.card.light,
              borderColor: COLORS.warning,
              borderWidth: 1,
            }]}>
            <View style={[styles.iconContainer, { backgroundColor: `${COLORS.warning}15` }]}>
              <Ionicons name="bulb-outline" size={24} color={COLORS.warning} />
            </View>
            <Text style={[styles.cardTitle, { color: isDark ? COLORS.text.dark : COLORS.text.light }]}>
              AI Assistant
            </Text>
            <Text style={styles.cardDescription}>Get personalized suggestions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <NewTalkModal
        visible={showNewTalkModal}
        onClose={() => setShowNewTalkModal(false)}
        onSubmit={handleNewTalk}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 60,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  brandingContainer: {
    marginTop: 0,
  },
  tedxLogo: {
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -1,
  },
  prepareText: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 4,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    padding: 8,
  },
  card: {
    padding: 20,
    borderRadius: 24,
    width: '47%',
    aspectRatio: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e62b1e15',
  },
  cardLarge: {
    width: '100%',
    aspectRatio: 2,
  },
  cardWide: {
    width: '100%',
    aspectRatio: 2.5,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#e62b1e10',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    color: COLORS.primary,
  },
  cardDescription: {
    fontSize: 15,
    color: '#666666',
    opacity: 0.8,
  },
});