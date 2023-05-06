import { Alert, StyleSheet, View } from 'react-native';
import OutlinedButton from '../UI/OutlinedButton';
import { Colors } from '../../constants/colors';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';

const LocationPicker = () => {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Φραγή χρήσης της τοποθεσίας',
        'Εάν θέλετε να καταστεί πλήρως λειτουργική η εφαρμογή θα πρέπει να εγκρίνετε την χρήση της τοποθεσίας σας.'
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    console.log('Τοποθεσία', location);
  };

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
