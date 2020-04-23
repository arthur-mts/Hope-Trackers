import 'react-native-gesture-handler';

import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import Routes from '~/routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="rgba(255, 255, 255, 0.5)"
        barStyle="dark-content"
        translucent
      />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
