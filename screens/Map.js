import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = () => {
  const initialRegion = {
    latitude: 40.640063,
    longitude: 22.944419,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return <MapView initialRegion={initialRegion} style={styles.map}></MapView>;
};
export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
