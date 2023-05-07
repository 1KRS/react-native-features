import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import OutlinedButton from '../UI/OutlinedButton';
import { Colors } from '../../constants/colors';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';
import { useEffect, useState } from 'react';
import { getAddress, getMapPreview } from '../../utils/location';
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from '@react-navigation/native';

const LocationPicker = ({ onPickLocation }) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  const [pickedLocation, setPickedLocation] = useState();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lng,
          pickedLocation.lat
        );
        onPickLocation({ ...pickedLocation, address: address });
      }
    };
    handleLocation();
  }, [pickedLocation, onPickLocation]);

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
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate('Χάρτης');
  };

  let locationPreview = <Text>Δεν έχει επιλεγεί τοποθεσία.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        source={{ uri: getMapPreview(pickedLocation.lng, pickedLocation.lat) }}
        style={styles.image}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
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
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
