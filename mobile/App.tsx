import 'react-native-gesture-handler';

import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {Subscription} from 'react-native-location';
import MapView, {Region} from 'react-native-maps';

import {debounce} from 'lodash';

import {requestPermission, onCurrentLocationUpdate} from '~/services/location';
import mapStyle from '~/styles/maps';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

const App = () => {
  const [currentLocation, setCurrentLocation] = useState<Region>({
    longitude: -6.966605,
    latitude: -35.7968537,
    longitudeDelta: 0.01,
    latitudeDelta: 0.01,
  });

  useEffect(() => {
    let unsubscribe: Subscription;

    requestPermission({
      android: {
        detail: 'fine',
      },
    }).then((granted: boolean) => {
      if (granted) {
        unsubscribe = onCurrentLocationUpdate((locations: Region[]) => {
          const {longitude, latitude} = locations[0];

          console.log({longitude, latitude});

          setCurrentLocation({
            longitude,
            latitude,
            longitudeDelta: 0.02,
            latitudeDelta: 0.02,
          });
        });
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const handleRegionChange = (region: Region) => {
    // setCurrentLocation(region);
    console.log({region});
  };

  return (
    <>
      <StatusBar
        backgroundColor="rgba(255, 255, 255, 0.5)"
        barStyle="dark-content"
        translucent
      />
      <MapView
        style={styles.map}
        onRegionChange={handleRegionChange}
        showsUserLocation={true}
        showsCompass={true}
        showsMyLocationButton={true}
        customMapStyle={mapStyle}
        showsScale={true}
        userLocationAnnotationTitle="Opa"
        initialRegion={currentLocation}
      />
    </>
  );
};

export default App;
