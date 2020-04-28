import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import ChatScreen from '~/pages/Chat';
import MarkDataScreen from '~/pages/MarkData';
import ProfileScreen from '~/pages/Profile';
import SearchScreen from '~/pages/Search';
import HomeRoutes from '~/routes/home';

const Stack = createStackNavigator();

const routes: React.FC = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeRoutes} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="MarkData" component={MarkDataScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default routes;
