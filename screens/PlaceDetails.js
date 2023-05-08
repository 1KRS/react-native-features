import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import OutlinedButton from '../components/UI/OutlinedButton';
import { Colors } from '../constants/colors';
import { useEffect, useState } from 'react';
import { fetchPlaceDetails } from '../utils/database';

const PlaceDetails = ({ route }) => {
  const [fetchedPlace, setFetchedPlace] = useState();
  const showOnMapHandler = () => {};

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    const loadPlaceData = async () => {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    };

    loadPlaceData();
  }, [selectedPlaceId]); // use selectedPlaceId to fetch data for a single place

  if (!fetchedPlace) {
    return <View style={styles.fallback}>Loading place data...</View>;
  }

  return (
    <ScrollView>
      {/*  <Image style={styles.image} source={{uri: fetchedPlace.imageUri}} /> */}
      <Image style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          {/* <Text style={styles.address}>{fetchedPlace.address}</Text> */}
          <Text style={styles.address}>Διεύθυνση</Text>
        </View>
        <OutlinedButton iconName="map" onPress={showOnMapHandler}>
          Δες σε Χάρτη
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};
export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
