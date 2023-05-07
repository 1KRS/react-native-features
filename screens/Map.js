import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/UI/IconButton';

const Map = ({ navigation }) => {
  const initialPosition = {
    latitude: 40.640063,
    longitude: 22.944419,
  };

  const initialRegion = {
    ...initialPosition,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [selectedLocation, setSelectedLocation] = useState(); // initialPosition // Εάν θέλω να ξεκινήσει με πινέζα στον χάρτη σε συγκεκριμένο σημείο

  const selectLocationHandler = async (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    await setSelectedLocation({ latitude: lat, longitude: lng });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'Δεν επιλέχθηκε τοποθεσία!',
        'Επιλέξτε τοποθεσία ακουμπώντας ένα σημείο στον Χάρτη.'
      );
      return;
    }
    navigation.navigate('Προσθήκη Μέρους', {
      pickedLat: selectedLocation.latitude,
      pickedLng: selectedLocation.longitude,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          iconName="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      initialRegion={initialRegion}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker title="Επιλεγμένη Τοποθεσία" coordinate={selectedLocation} /> // Προσοχή! το selectedLocation είναι αντικείμενο
      )}
    </MapView>
  );
};
export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
