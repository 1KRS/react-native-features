import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';

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
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary500,
          },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 },
        }}
      >
        <Stack.Screen name="Αρχική Οθόνη" component={InitialScreen} options={
          ({navigation}) => ({
            title: 'Αρχική Οθόνη',
            headerRight: ({tintColor}) => (
              <IconButton iconName="map"
                size={24}
                color={tintColor}
                onPress={() => navigation.navigate('Όλα τα μέρη')}/> 
            )
          })
        }/>
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
