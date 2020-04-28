import React, {useState, useEffect, useRef, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

import MarkPreview, {
  Handlers as PreviewHandlers,
} from '~/components/MarkPreview';
import SearchBar from '~/components/SearchBar';
import {MarkData} from '~/schemas/Mark';
import {useCurrentLocation} from '~/services/current-location';
import {useRenderMarks} from '~/services/render-marks';
import mapStyle from '~/styles/maps';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

const Explore: React.FC = () => {
  const mapRef = useRef<MapView>(null);
  const previewRef = useRef<PreviewHandlers>(null);
  const currentLocation = useCurrentLocation();

  const [marks] = useState<MarkData[]>([
    {
      id: '1',
      saved: false,
      mark: 'shopping-cart',
      lat: -6.9680428,
      lng: -35.7934528,
    },
    {
      id: '2',
      saved: true,
      mark: 'local-dining',
      lat: -6.9695549,
      lng: -35.7919718,
    },
    {
      id: '3',
      saved: false,
      mark: 'local-hospital',
      lat: -6.9693013,
      lng: -35.7951133,
    },
    {
      id: '4',
      saved: false,
      mark: 'room-service',
      lat: -6.9623697,
      lng: -35.7960132,
    },
    {
      id: '5',
      saved: false,
      mark: 'attach-money',
      lat: -6.9705093,
      lng: -35.8008358,
    },
  ]);

  const [
    renderedMarks,
    {clearSelection, currentSelection, setSelection},
  ] = useRenderMarks(marks);

  const handlePreviewItemChanged = useCallback(
    (mark: MarkData) => {
      mapRef.current?.animateToRegion({
        latitude: mark.lat,
        longitude: mark.lng,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
      setSelection(mark);
    },
    [mapRef, setSelection],
  );

  useEffect(() => {
    if (currentSelection) {
      previewRef.current?.selectItem(currentSelection);
    } else {
      previewRef.current?.dismiss();
    }
  }, [currentSelection, mapRef, marks]);

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={currentLocation}
        onPress={clearSelection}
        showsCompass={false}
        customMapStyle={mapStyle}
        showsUserLocation={true}
        showsMyLocationButton={false}
        mapPadding={{bottom: -50, left: 0, top: 0, right: 0}}>
        {renderedMarks}
      </MapView>

      <MarkPreview
        data={marks}
        ref={previewRef}
        onCurrentItemChange={handlePreviewItemChanged}
      />

      <SearchBar />
    </>
  );
};

export default Explore;
