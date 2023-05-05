import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';

const Stack = createNativeStackNavigator();

const InitialScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.emoticon}>🇬🇷🇬🇷🇬🇷</Text>
      <Text style={styles.text}>Ούλε τε και μάλα χαίρε!</Text>
      <Text style={styles.emoticon}>🤩</Text>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Όλα τα μέρη"
          component={AllPlaces}
          options={({ navigation }) => ({
            headerRight: ({ tintColor }) => (
              <IconButton
                iconName="add"
                size={24}
                color={tintColor}
                onPress={() => navigation.navigate('Προσθήκη Μέρους')}
              />
            ),
          })}
        />
        <Stack.Screen name="Προσθήκη Μέρους" component={AddPlace} />
        <Stack.Screen name="Αρχική Οθόνη" component={InitialScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
