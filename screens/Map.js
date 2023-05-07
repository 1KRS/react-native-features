import { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = () => {
  const initialPosition = {
    latitude: 40.640063,
    longitude: 22.944419,
  }
  
  const initialRegion = {
    ...initialPosition,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [selectedLocation, setSelectedLocation] = useState(
    // initialPosition // Εάν θέλω να ξεκινήσει με πινέζα στον χάρτη σε συγκεκριμένο σημείο
  );

  const selectLocationHandler = (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ latitude: lat, longitude: lng });
  };

  return (
    <MapView
      initialRegion={initialRegion}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation && <Marker title='Επιλεγμένη Τοποθεσία' coordinate={selectedLocation}/>}
    </MapView>
  );
};
export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
