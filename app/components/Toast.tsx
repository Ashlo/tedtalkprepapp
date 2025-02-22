import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
  type?: 'success' | 'error';
  duration?: number;
}

export default function Toast({ 
  message, 
  isVisible, 
  onHide, 
  type = 'success',
  duration = 2500 
}: ToastProps) {
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  const backgroundColor = type === 'success' ? '#4CAF50' : '#F44336';

  useEffect(() => {
    if (isVisible) {
      translateY.value = withSequence(
        withSpring(-100, { damping: 15 }),
        withTiming(-120, { duration: 150 }),
        withTiming(-110, { duration: 150 }),
      );
      opacity.value = withTiming(1, { duration: 200 });

      const hideTimer = setTimeout(() => {
        translateY.value = withTiming(100, { duration: 300 }, () => {
          runOnJS(onHide)();
        });
        opacity.value = withTiming(0, { duration: 300 });
      }, duration);

      return () => clearTimeout(hideTimer);
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.toast, { backgroundColor }, animatedStyle]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 9999,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 