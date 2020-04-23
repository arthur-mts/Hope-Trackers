import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Subscription, Location} from 'react-native-location';
import MapView, {Region} from 'react-native-maps';

import {FloatingButton} from '~/components/Buttons';
import {requestPermission, onCurrentLocationUpdate} from '~/libs/location';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

const Explore: React.FC = () => {
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
      <MapView style={styles.map} initialRegion={currentLocation} />

      <FloatingButton
        position="BOTTOM_RIGHT"
        backgroundColor="#FFF"
        rippleColor="#999"
        iconColor="#999"
        iconSize={20}
        icon="gps-fixed"
      />
    </>
  );
};

export default Explore;
