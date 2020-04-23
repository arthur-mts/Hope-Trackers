import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import HomeRoutes from '~/routes/home';

const Stack = createStackNavigator();

const routes: React.FC = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeRoutes} />
    </Stack.Navigator>
  );
};

export default routes;
