import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface AvatarProps {
  size?: number;
  image?: string;
  onPress?: () => void;
}

export default function Avatar({ 
  size = 40, 
  image,
  onPress 
}: AvatarProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push('/(tabs)/settings');
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { width: size, height: size, borderRadius: size / 2 }
      ]}
      onPress={handlePress}>
      {image ? (
        <Image 
          source={{ uri: image }} 
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} 
        />
      ) : (
        <View style={[styles.placeholder, { backgroundColor: '#e62b1e15' }]}>
          <Ionicons name="person" size={size * 0.6} color="#e62b1e" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#e62b1e',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 