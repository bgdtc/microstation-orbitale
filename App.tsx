import React, { useState } from 'react';
import { StyleSheet, Text, View,Button  } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';


export default function App() {
   const [location, setLocation] = useState({coords:{latitude:0,longitude:0}});
   const [errorMsg, setErrorMsg] = useState('');


  const acquirePosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    const background = await Location.startLocationUpdatesAsync()
    const location = await Location.watchPositionAsync({
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 2
    }, location => {
      setLocation(location);
    });
    
  }

  const disclosePosition = async () => {
    // locationSubscrition?.remove()

  }

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }
  //     await Location.watchPositionAsync({
  //       accuracy: Location.Accuracy.Highest,
  //       distanceInterval: 2
  //     }, location => {
  //       setLocation(location);
  //     });
  //   })();
  // }, []);
let text:any = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    console.log(location.coords.latitude,location.coords.longitude)
    text = location.coords.latitude + '-' + location.coords.longitude
  }

  return (
    <View style={styles.container}>
      <Button onPress={() => acquirePosition()} title='track me' />
      <Button onPress={() => disclosePosition()} title='stop tracking' />
      <Text>{text}</Text>
      {
        location.coords.longitude !== 0 ?
        <MapView minZoomLevel={15} region={{longitude: location.coords.longitude,latitude: location.coords.latitude,latitudeDelta: 0,longitudeDelta: 0}} style={styles.map}>
          <Marker coordinate={{latitude:location.coords.latitude,longitude:location.coords.longitude}} />
        </MapView>
        : ''
      }
      
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: 300,
    height:300
  }
});
