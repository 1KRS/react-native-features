import { FlatList, StyleSheet, Text, View } from 'react-native';
import PlaceItem from './PlaceItem';
import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const PlacesList = ({ places }) => {
  const navigation = useNavigation();

  const selectPlaceHandler = (id) => {
    navigation.navigate('Πληροφορίες Μέρους', { placeId: id });
  };

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Δεν έχουν προστεθεί μέρη ακόμη.</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={selectPlaceHandler} />}
      style={styles.list}
    />
  );
};
export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.primary200,
  },
});
