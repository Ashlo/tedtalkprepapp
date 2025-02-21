import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const experiences = [
  { id: 'beginner', label: 'First Time Speaker', icon: 'star-outline' },
  { id: 'intermediate', label: 'Some Experience', icon: 'star-half-outline' },
  { id: 'advanced', label: 'Experienced Speaker', icon: 'star' },
];

export default function ExperienceScreen() {
  const [selected, setSelected] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What's your speaking experience?</Text>
        <Text style={styles.subtitle}>
          This helps us tailor the preparation process for you
        </Text>
      </View>

      <View style={styles.options}>
        {experiences.map((exp) => (
          <TouchableOpacity
            key={exp.id}
            style={[
              styles.option,
              selected === exp.id && styles.selectedOption,
            ]}
            onPress={() => setSelected(exp.id)}>
            <Ionicons
              name={exp.icon}
              size={32}
              color={selected === exp.id ? '#ffffff' : '#e62b1e'}
            />
            <Text
              style={[
                styles.optionText,
                selected === exp.id && styles.selectedOptionText,
              ]}>
              {exp.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !selected && styles.buttonDisabled]}
          disabled={!selected}
          onPress={() => router.push('/(onboarding)/topic')}>
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
  options: {
    gap: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e62b1e',
    gap: 16,
  },
  selectedOption: {
    backgroundColor: '#e62b1e',
  },
  optionText: {
    fontSize: 18,
    color: '#e62b1e',
    fontWeight: '600',
  },
  selectedOptionText: {
    color: '#ffffff',
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