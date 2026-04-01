import { StatusBar } from 'expo-status-bar';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const quickActions = [
  { emoji: '🚧', label: 'Report Hazard', description: 'Send road incident details quickly' },
  { emoji: '📍', label: 'Nearby Alerts', description: 'View issues around your location' },
  { emoji: '🛣️', label: 'Road Updates', description: 'Track current traffic and closures' },
];

const setupChecklist = [
  'Android Studio + SDK installed',
  'Android emulator running or physical device connected',
  'Run: npm run prebuild (first time only)',
  'Run: npm run android:studio',
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Text style={styles.badge}>Roadwatch PH</Text>
          <Text style={styles.title}>Drive safer with real-time road reports.</Text>
          <Text style={styles.subtitle}>
            This native workspace is Android Studio-ready and built with Expo + React Native.
          </Text>

          <View style={styles.buttonRow}>
            <Pressable style={[styles.button, styles.buttonPrimary]}>
              <Text style={styles.buttonPrimaryText}>Start Reporting</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buttonSecondary]}>
              <Text style={styles.buttonSecondaryText}>Open Map</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          {quickActions.map((action) => (
            <View key={action.label} style={styles.actionCard}>
              <Text style={styles.actionEmoji}>{action.emoji}</Text>
              <View style={styles.actionTextWrap}>
                <Text style={styles.actionTitle}>{action.label}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Android Studio checklist</Text>
          {setupChecklist.map((step, index) => (
            <View key={step} style={styles.checklistItem}>
              <Text style={styles.checklistIndex}>{index + 1}</Text>
              <Text style={styles.checklistText}>{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF4FF',
  },
  content: {
    padding: 16,
    paddingBottom: 28,
    gap: 16,
  },
  heroCard: {
    backgroundColor: '#0D2A5C',
    borderRadius: 22,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#21498B',
    color: '#E7F0FF',
    fontWeight: '700',
    fontSize: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 100,
    letterSpacing: 0.4,
    marginBottom: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    marginBottom: 10,
  },
  subtitle: {
    color: '#D9E6FF',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  button: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  buttonPrimary: {
    backgroundColor: '#FFFFFF',
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: '#7FA8EE',
    backgroundColor: 'transparent',
  },
  buttonPrimaryText: {
    color: '#0D2A5C',
    fontWeight: '700',
    fontSize: 14,
  },
  buttonSecondaryText: {
    color: '#DCE8FF',
    fontWeight: '700',
    fontSize: 14,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#0C1B35',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    gap: 10,
  },
  sectionTitle: {
    color: '#15396D',
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 4,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F8FF',
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  actionEmoji: {
    fontSize: 22,
  },
  actionTextWrap: {
    flex: 1,
  },
  actionTitle: {
    color: '#12376B',
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 2,
  },
  actionDescription: {
    color: '#4A5F82',
    fontSize: 13,
    lineHeight: 18,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  checklistIndex: {
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#E5EEFF',
    color: '#12376B',
    fontWeight: '800',
    overflow: 'hidden',
  },
  checklistText: {
    flex: 1,
    color: '#2F4467',
    fontSize: 14,
    lineHeight: 20,
  },
});
