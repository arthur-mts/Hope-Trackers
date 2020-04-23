import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

const App: React.FC = () => {
  return (
    <>
      <StatusBar
        backgroundColor="rgba(255, 255, 255, 0.5)"
        barStyle="dark-content"
      />

      <MapView style={styles.map} />
    </>
  );
};

export default App;
