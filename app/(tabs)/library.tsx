import { View, Text, StyleSheet, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockTalks = [
  {
    id: '1',
    title: 'The Future of AI',
    duration: '15:42',
    lastPracticed: '2 days ago',
  },
  {
    id: '2',
    title: 'Climate Change Solutions',
    duration: '17:30',
    lastPracticed: '1 week ago',
  },
  {
    id: '3',
    title: 'Innovation in Education',
    duration: '16:15',
    lastPracticed: '3 days ago',
  },
];

export default function LibraryScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const textColor = isDark ? '#ffffff' : '#000000';
  const backgroundColor = isDark ? '#1a1a1a' : '#ffffff';
  const cardBackground = isDark ? '#2a2a2a' : '#f5f5f5';

  const renderTalk = ({ item }) => (
    <TouchableOpacity
      style={[styles.talkCard, { backgroundColor: cardBackground }]}>
      <View style={styles.talkInfo}>
        <Text style={[styles.talkTitle, { color: textColor }]}>{item.title}</Text>
        <Text style={[styles.talkMeta, { color: isDark ? '#888' : '#666' }]}>
          Duration: {item.duration} • Last practiced: {item.lastPracticed}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={24}
        color={isDark ? '#888' : '#666'}
      />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>Your Talks</Text>
        <TouchableOpacity style={styles.sortButton}>
          <Ionicons name="filter-outline" size={24} color={textColor} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockTalks}
        renderItem={renderTalk}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={30} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  sortButton: {
    padding: 8,
  },
  listContainer: {
    padding: 20,
  },
  talkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  talkInfo: {
    flex: 1,
  },
  talkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  talkMeta: {
    fontSize: 14,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e62b1e',
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