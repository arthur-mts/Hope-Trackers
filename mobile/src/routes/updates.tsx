import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

import TopTab from '~/components/TopTab';
import MessagesScreen from '~/pages/Messages';
import NotificationsScreen from '~/pages/Notifications';

const UpdateRoutes: React.FC = () => {
  return (
    <>
      <Tab.Navigator tabBar={(props) => <TopTab {...props} />}>
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{title: 'Notificações'}}
        />
        <Tab.Screen
          name="Messages"
          component={MessagesScreen}
          options={{title: 'Mensagens'}}
        />
      </Tab.Navigator>
    </>
  );
};

export default UpdateRoutes;
