import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ExploreScreen from '~/pages/Explore';

const Tab = createBottomTabNavigator();

const routes: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Explore" component={ExploreScreen} />
    </Tab.Navigator>
  );
};

export default routes;
