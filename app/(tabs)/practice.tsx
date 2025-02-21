import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { withSpring, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

export default function PracticeScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const colorScheme = useColorScheme();
  const scale = useSharedValue(1);

  const isDark = colorScheme === 'dark';
  const textColor = isDark ? '#ffffff' : '#000000';
  const backgroundColor = isDark ? '#1a1a1a' : '#ffffff';

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    scale.value = withSpring(isRecording ? 1 : 1.2);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.timerContainer}>
        <Text style={[styles.timer, { color: textColor }]}>{formatTime(time)}</Text>
        <Text style={[styles.timerLabel, { color: textColor }]}>
          {time > 1080 ? 'Over TED limit!' : 'Recording time'}
        </Text>
      </View>

      <Animated.View style={[styles.recordButtonContainer, animatedStyle]}>
        <TouchableOpacity
          style={[
            styles.recordButton,
            { backgroundColor: isRecording ? '#ff4444' : '#e62b1e' },
          ]}
          onPress={toggleRecording}>
          <Ionicons
            name={isRecording ? 'stop' : 'mic'}
            size={40}
            color="#ffffff"
          />
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5' }]}>
          <Text style={[styles.statValue, { color: textColor }]}>0</Text>
          <Text style={[styles.statLabel, { color: textColor }]}>Practices</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5' }]}>
          <Text style={[styles.statValue, { color: textColor }]}>18:00</Text>
          <Text style={[styles.statLabel, { color: textColor }]}>Target</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  timer: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  timerLabel: {
    fontSize: 16,
    marginTop: 8,
  },
  recordButtonContainer: {
    marginVertical: 40,
  },
  recordButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingBottom: 40,
  },
  statCard: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '45%',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    marginTop: 4,
  },
});