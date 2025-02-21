import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface FABProps {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: string;
  size?: number;
  style?: any;
}

export default function FAB({
  onPress,
  icon = 'add',
  color = '#e62b1e',
  size = 32,
  style,
}: FABProps) {
  return (
    <Animated.View 
      entering={FadeInDown}
      style={[styles.fabContainer, style]}>
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: color }]}
        onPress={onPress}>
        <Ionicons name={icon} size={size} color="#ffffff" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
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
}); 