import PlaceForm from '../components/Places/PlaceForm';

const AddPlace = ({navigation}) => {
  const createPlaceHandler = (place) => {
navigation.navigate('Όλα τα μέρη', {
  place: place
})
  }
  return <PlaceForm onCreatePlace={createPlaceHandler}/>;
};
export default AddPlace;
