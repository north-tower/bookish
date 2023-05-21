import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const App = () => {
  const [markerCoordinate, setMarkerCoordinate] = useState(null);

  const handleMapPress = ({ nativeEvent }) => {
    setMarkerCoordinate(nativeEvent.coordinate);
  };

  const handleSaveLocation = () => {
    if (markerCoordinate) {
      // Here you can save the markerCoordinate to your desired storage or perform any other action
      Alert.alert('Location Saved', 'The location has been saved successfully!');
    } else {
      Alert.alert('No Location', 'Please select a location on the map before saving.');
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setMarkerCoordinate({ latitude, longitude });
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} onPress={handleMapPress}>
        {markerCoordinate && (
          <Marker coordinate={markerCoordinate} title="Selected Location" />
        )}
      </MapView>
      <TouchableOpacity style={styles.button} onPress={handleSaveLocation}>
        <Text style={styles.buttonText}>Save Location</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={getCurrentLocation}>
        <Text style={styles.buttonText}>Use Current Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
