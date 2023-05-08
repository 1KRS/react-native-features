import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import PlaceDetails from './screens/PlaceDetails';
// import { useEffect, useState } from 'react';
// import { init } from './utils/database';
// import * as SplashScreen from 'expo-splash-screen';

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

// SplashScreen.preventAutoHideAsync();

export default function App() {
  // const [dbInitialized, setDbInitialized] = useState(false);

  // useEffect(() => {
  //   init()
  //     .then(() => {
  //       setDbInitialized(true);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  // if (!dbInitialized) {
  //   console.log('Δεν είναι έτοιμο');
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary500,
          },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 },
        }}
      >
        <Stack.Screen
          name="Αρχική Οθόνη"
          component={InitialScreen}
          options={({ navigation }) => ({
            title: 'Αρχική Οθόνη',
            headerRight: ({ tintColor }) => (
              <IconButton
                iconName="map"
                size={24}
                color={tintColor}
                onPress={() => navigation.navigate('Όλα τα μέρη')}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Όλα τα μέρη"
          component={AllPlaces}
          options={({ navigation }) => ({
            title: 'Τα αγαπημένα σου μέρη',
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
        <Stack.Screen
          name="Προσθήκη Μέρους"
          component={AddPlace}
          options={{ title: 'Πρόσθεσε ένα νέο μέρος' }}
        />
        <Stack.Screen name="Χάρτης" component={Map} />
        <Stack.Screen
          name="Πληροφορίες Μέρους"
          component={PlaceDetails}
          options={{ title: 'Loading Place...' }}
        />
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
