import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const featuredTalks = [
  {
    id: '1',
    title: 'The Power of Vulnerability',
    speaker: 'Brené Brown',
    image: 'https://images.unsplash.com/photo-1494178270175-e96de2971df9?w=800&auto=format&fit=crop&q=60',
    duration: '20:19',
    youtubeUrl: 'https://www.youtube.com/watch?v=iCvmsMzlF7o',
  },
  {
    id: '2',
    title: 'How Great Leaders Inspire Action',
    speaker: 'Simon Sinek',
    image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&auto=format&fit=crop&q=60',
    duration: '18:04',
    youtubeUrl: 'https://www.youtube.com/watch?v=qp0HIF3SfI4',
  },
  {
    id: '3',
    title: 'The Power of Introverts',
    speaker: 'Susan Cain',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&auto=format&fit=crop&q=60',
    duration: '19:04',
    youtubeUrl: 'https://www.youtube.com/watch?v=c0KYU2j0TM4',
  },
];

export default function FeaturedTalks() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const textColor = isDark ? '#ffffff' : '#000000';

  const openTalk = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: textColor }]}>Featured TED Talks</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {featuredTalks.map((talk) => (
          <TouchableOpacity
            key={talk.id}
            style={styles.talkCard}
            onPress={() => openTalk(talk.youtubeUrl)}>
            <Image source={{ uri: talk.image }} style={styles.talkImage} />
            <View style={styles.overlay}>
              <Ionicons name="play-circle" size={44} color="white" />
            </View>
            <View style={styles.talkInfo}>
              <Text style={styles.talkTitle} numberOfLines={2}>
                {talk.title}
              </Text>
              <Text style={styles.talkSpeaker}>{talk.speaker}</Text>
              <View style={styles.durationContainer}>
                <Ionicons name="time-outline" size={14} color="#e62b1e" />
                <Text style={styles.duration}>{talk.duration}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  talkCard: {
    width: 280,
    marginHorizontal: 8,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  talkImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  talkInfo: {
    padding: 16,
  },
  talkTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000000',
  },
  talkSpeaker: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
}); 