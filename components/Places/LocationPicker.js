import { StyleSheet, View } from 'react-native';
import OutlinedButton from '../UI/OutlinedButton';
import { Colors } from '../../constants/colors';

const LocationPicker = () => {
  const getLocationHandler = () => {};
  const pickOnMapHandler = () => {};

  return (
    <View>
      <View style={styles.mapPreview}></View>
      <View style={styles.actions}>
        <OutlinedButton iconName="location" onPress={getLocationHandler}>
          Εντοπισμός
        </OutlinedButton>
        <OutlinedButton iconName="map" onPress={pickOnMapHandler}>
          Επιλογή Σε Χάρτη
        </OutlinedButton>
      </View>
    </View>
  );
};
export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mapPreviews: {},
});
