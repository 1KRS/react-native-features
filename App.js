import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoticon}>🇬🇷🇬🇷🇬🇷</Text>
      <Text style={styles.text}>Ούλε τε και μάλα χαίρε!</Text>
      <Text style={styles.emoticon}>🤩</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  emoticon: {
    fontSize: 45,
  },
});
