import {useState, useEffect} from 'react';
import {Subscription, Location} from 'react-native-location';
import {Region} from 'react-native-maps';

import {onCurrentLocationUpdate, requestPermission} from '~/libs/location';

export const useCurrentLocation = (realtime: boolean = false) => {
  const [currentLocation, setCurrentLocation] = useState<Region>();

  useEffect(() => {
    let unsubscribe: Subscription;

    (async () => {
      const haveAccessLocationPermission = await requestPermission({
        android: {detail: 'fine'},
      });

      if (haveAccessLocationPermission) {
        unsubscribe = onCurrentLocationUpdate((locations: Location[]) => {
          const {longitude, latitude} = locations[0];

          setCurrentLocation({
            longitude,
            latitude,
            longitudeDelta: 0.02,
            latitudeDelta: 0.02,
          });

          if (!realtime) {
            unsubscribe();
          }
        });
      }
    })();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [realtime]);

  return currentLocation;
};
