import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';

const PlaceForm = () => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [takenImage, setTakenImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  const changeTitleHandler = (enteredText) => {
    setEnteredTitle(enteredText);
  };

  const takeImageHandler = (imageUri) => {
    setTakenImage(imageUri);
  };
  
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    console.log(enteredTitle)
    console.log(takenImage)
    console.log(pickedLocation )
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Τίτλος</Text>
        <TextInput
          onChangeText={changeTitleHandler}
          value={enteredTitle}
          style={styles.input}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Πρόσθεσε Μέρος</Button>
    </ScrollView>
  );
};
export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    marginHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderRadius: 5,
  },
});
