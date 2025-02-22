import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Animated, { withSpring, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import * as FileSystem from 'expo-file-system';
import Toast from '../components/Toast';

interface Recording {
  file: string;
  duration: number;
}

export default function PracticeScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const colorScheme = useColorScheme();
  const scale = useSharedValue(1);
  const [showToast, setShowToast] = useState(false);

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

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      setTime(0);
      scale.value = withSpring(1.2);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      if (!uri) return;

      const info = await FileSystem.getInfoAsync(uri);
      setRecordings(prev => [...prev, {
        file: uri,
        duration: time
      }]);

      setRecording(null);
      setIsRecording(false);
      scale.value = withSpring(1);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const playSound = async (uri: string) => {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync({ uri });
    setSound(newSound);
    setIsPlaying(true);
    await newSound.playAsync();
    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && !status.isPlaying) {
        setIsPlaying(false);
      }
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const deleteRecording = async (index: number) => {
    try {
      const recording = recordings[index];
      await FileSystem.deleteAsync(recording.file);
      setRecordings(prev => prev.filter((_, i) => i !== index));
      setShowToast(true);
    } catch (err) {
      console.error('Failed to delete recording', err);
    }
  };

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
          onPress={isRecording ? stopRecording : startRecording}>
          <Ionicons
            name={isRecording ? 'stop' : 'mic'}
            size={40}
            color="#ffffff"
          />
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.recordingsContainer}>
        {recordings.map((rec, index) => (
          <View key={index} style={[styles.recordingItem, { backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5' }]}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => playSound(rec.file)}>
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={24}
                color={textColor}
              />
              <Text style={[styles.recordingText, { color: textColor }]}>
                Recording {index + 1} ({formatTime(rec.duration)})
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteRecording(index)}>
              <Ionicons name="trash-outline" size={20} color="#e62b1e" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Toast
        message="Recording deleted successfully"
        isVisible={showToast}
        onHide={() => setShowToast(false)}
        type="success"
      />
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
  recordingsContainer: {
    width: '100%',
    padding: 20,
  },
  recordingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deleteButton: {
    padding: 8,
  },
  recordingText: {
    marginLeft: 12,
    fontSize: 16,
  },
});