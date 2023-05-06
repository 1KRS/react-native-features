import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';
import { useState } from 'react';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

const ImagePicker = () => {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermissions = async () => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Φραγή χρήσης της κάμερας',
        'Δεν έχετε εγκρίνει την χρήση της κάμερας. Εάν θέλετε να καταστεί πλήρως λειτουργική η εφαρμογή θα πρέπει να εγκρίνετε την άδεια χρήσης της κάμερας.'
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.assets[0].uri);
  };

  let imagePreview = <Text>Δεν έχει ληφθεί κάποια φωτογραφία ακόμη</Text>;

  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton iconName='camera' onPress={takeImageHandler}>
        Λήψη Φωτογραφίας
      </OutlinedButton>
    </View>
  );
};
export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: Colors.primary100,
  },
});
