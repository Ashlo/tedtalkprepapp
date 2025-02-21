import { View, Text, StyleSheet, Switch, TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const colorScheme = useColorScheme();

  const isDark = colorScheme === 'dark';
  const textColor = isDark ? '#ffffff' : '#000000';
  const backgroundColor = isDark ? '#1a1a1a' : '#ffffff';
  const cardBackground = isDark ? '#2a2a2a' : '#f5f5f5';

  const SettingItem = ({ icon, title, value, onValueChange, type = 'switch' }) => (
    <View style={[styles.settingItem, { backgroundColor: cardBackground }]}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color="#e62b1e" />
        <Text style={[styles.settingTitle, { color: textColor }]}>{title}</Text>
      </View>
      {type === 'switch' ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#767577', true: '#e62b1e' }}
          thumbColor={value ? '#fff' : '#f4f3f4'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={24} color={isDark ? '#888' : '#666'} />
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>Settings</Text>
      </View>

      <View style={styles.settingsGroup}>
        <SettingItem
          icon="notifications-outline"
          title="Practice Reminders"
          value={notifications}
          onValueChange={setNotifications}
        />
        <SettingItem
          icon="moon-outline"
          title="Dark Mode"
          value={darkMode}
          onValueChange={setDarkMode}
        />
        <SettingItem
          icon="time-outline"
          title="Practice Duration"
          type="button"
        />
        <SettingItem
          icon="language-outline"
          title="Language"
          type="button"
        />
      </View>

      <View style={styles.settingsGroup}>
        <TouchableOpacity style={[styles.settingItem, { backgroundColor: cardBackground }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="help-circle-outline" size={24} color="#e62b1e" />
            <Text style={[styles.settingTitle, { color: textColor }]}>Help & Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={isDark ? '#888' : '#666'} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.settingItem, { backgroundColor: cardBackground }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="information-circle-outline" size={24} color="#e62b1e" />
            <Text style={[styles.settingTitle, { color: textColor }]}>About</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={isDark ? '#888' : '#666'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  settingsGroup: {
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    marginLeft: 15,
  },
});