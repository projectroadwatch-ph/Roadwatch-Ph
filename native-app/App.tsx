import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Roadwatch PH</Text>
        <Text style={styles.subtitle}>Native mobile app workspace is ready.</Text>
        <Text style={styles.note}>
          This code is isolated in native-app/ and separate from website/.
        </Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0D2A5C',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1E3A6D',
    marginBottom: 8,
  },
  note: {
    fontSize: 14,
    color: '#4C5B70',
    lineHeight: 21,
  },
});
