import { TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface BackButtonProps {
  onPress?: () => void;
  color?: string;
  style?: any;
  size?: number;
}

export default function BackButton({
  onPress,
  color,
  style,
  size = 24,
}: BackButtonProps) {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const isDark = colorScheme === 'dark';

  // Use provided color or default based on theme
  const iconColor = color || (isDark ? '#ffffff' : '#000000');
  const backgroundColor = isDark ? '#2a2a2a' : '#f5f5f5';

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.backButton, { backgroundColor }, style]}
      onPress={handlePress}>
      <Ionicons name="arrow-back" size={size} color={iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
}); 