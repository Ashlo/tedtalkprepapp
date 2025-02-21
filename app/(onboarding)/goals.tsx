import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const goals = [
  {
    id: 'inspire',
    label: 'Inspire Others',
    icon: 'flame-outline',
    description: 'Move and motivate your audience',
  },
  {
    id: 'educate',
    label: 'Share Knowledge',
    icon: 'book-outline',
    description: 'Teach something valuable',
  },
  {
    id: 'challenge',
    label: 'Challenge Ideas',
    icon: 'bulb-outline',
    description: 'Present new perspectives',
  },
  {
    id: 'storytell',
    label: 'Tell a Story',
    icon: 'heart-outline',
    description: 'Share personal experiences',
  },
];

export default function GoalsScreen() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const router = useRouter();

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id)
        ? prev.filter((g) => g !== id)
        : [...prev, id]
    );
  };

  const handleComplete = () => {
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What's your goal?</Text>
        <Text style={styles.subtitle}>
          Select up to 2 main objectives for your talk
        </Text>
      </View>

      <View style={styles.goals}>
        {goals.map((goal) => (
          <TouchableOpacity
            key={goal.id}
            style={[
              styles.goalCard,
              selectedGoals.includes(goal.id) && styles.selectedGoal,
            ]}
            onPress={() => toggleGoal(goal.id)}
            disabled={selectedGoals.length >= 2 && !selectedGoals.includes(goal.id)}>
            <Ionicons
              name={goal.icon}
              size={32}
              color={selectedGoals.includes(goal.id) ? '#ffffff' : '#e62b1e'}
            />
            <Text
              style={[
                styles.goalLabel,
                selectedGoals.includes(goal.id) && styles.selectedGoalText,
              ]}>
              {goal.label}
            </Text>
            <Text
              style={[
                styles.goalDescription,
                selectedGoals.includes(goal.id) && styles.selectedGoalText,
              ]}>
              {goal.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !selectedGoals.length && styles.buttonDisabled]}
          disabled={!selectedGoals.length}
          onPress={handleComplete}>
          <Text style={styles.buttonText}>Get Started</Text>
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
  goals: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  goalCard: {
    width: '47%',
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e62b1e',
    alignItems: 'center',
  },
  selectedGoal: {
    backgroundColor: '#e62b1e',
  },
  goalLabel: {
    fontSize: 18,
    color: '#e62b1e',
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  goalDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  selectedGoalText: {
    color: '#ffffff',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 24,
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