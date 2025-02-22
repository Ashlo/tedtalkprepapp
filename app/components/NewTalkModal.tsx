import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  FadeIn, 
  FadeOut, 
  SlideInDown, 
  SlideOutDown,
  ZoomIn,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Toast from './Toast';

interface NewTalkModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (topic: string, description: string) => void;
}

export default function NewTalkModal({ visible, onClose, onSubmit }: NewTalkModalProps) {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [showToast, setShowToast] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const backgroundColor = isDark ? '#1a1a1a' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';
  const placeholderColor = isDark ? '#888' : '#666';

  const handleSubmit = () => {
    if (topic.trim() && description.trim()) {
      setShowToast(true);
      withSequence(
        withTiming(1.2, { duration: 200 }),
        withTiming(1, { duration: 200 })
      );
      onSubmit(topic, description);
      setTopic('');
      setDescription('');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View 
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          style={styles.modalOverlay}>
          <Animated.View 
            entering={SlideInDown.springify().damping(15)}
            exiting={SlideOutDown.duration(200)}
            style={[styles.modalContent, { backgroundColor }]}>
            <Animated.View 
              entering={FadeIn.delay(200)}
              style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: textColor }]}>New Talk</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color={textColor} />
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              entering={ZoomIn.delay(300).duration(400)}>
              <TextInput
                style={[styles.input, { color: textColor, borderColor: isDark ? '#333' : '#ddd' }]}
                placeholder="Talk Topic"
                placeholderTextColor={placeholderColor}
                value={topic}
                onChangeText={setTopic}
              />
            </Animated.View>

            <Animated.View
              entering={ZoomIn.delay(400).duration(400)}>
              <TextInput
                style={[
                  styles.input,
                  styles.descriptionInput,
                  { color: textColor, borderColor: isDark ? '#333' : '#ddd' },
                ]}
                placeholder="Brief Description"
                placeholderTextColor={placeholderColor}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
              />
            </Animated.View>

            <Animated.View
              entering={ZoomIn.delay(500).duration(400)}>
              <TouchableOpacity
                style={[styles.submitButton, !topic || !description ? styles.buttonDisabled : null]}
                onPress={handleSubmit}
                disabled={!topic || !description}>
                <Text style={styles.submitButtonText}>Create Talk</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
      
      <Toast
        message="Talk created successfully! 🎉"
        isVisible={showToast}
        onHide={() => setShowToast(false)}
        type="success"
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#e62b1e',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 