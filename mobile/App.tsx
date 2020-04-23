import 'react-native-gesture-handler';

import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {Subscription, Location} from 'react-native-location';
import MapView, {Region} from 'react-native-maps';

import {FloatingButton} from '~/components/Buttons';
import {requestPermission, onCurrentLocationUpdate} from '~/libs/location';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

const App: React.FC = () => {
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
        unsubscribe = onCurrentLocationUpdate((locations: Location[]) => {
          const {longitude, latitude} = locations[0];

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

  return (
    <>
      <StatusBar
        backgroundColor="rgba(255, 255, 255, 0.5)"
        barStyle="dark-content"
        translucent
      />

      <MapView style={styles.map} initialRegion={currentLocation} />

      <FloatingButton
        position="BOTTOM_RIGHT"
        backgroundColor="#333"
        rippleColor="#FFF"
        iconColor="#FFF"
        iconSize={20}
        icon="gps-fixed"
      />
    </>
  );
};

export default App;
