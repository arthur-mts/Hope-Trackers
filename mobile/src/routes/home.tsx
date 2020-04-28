import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import ExploreScreen from '~/pages/Explore';
import SavedsScreen from '~/pages/Saveds';
import UpdateRoutes from '~/routes/updates';

const Tab = createMaterialBottomTabNavigator();

function getIcon(name: string) {
  return ({color}: {color: string}) => {
    return <Icon {...{name, color}} size={24} />;
  };
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#fff',
  },
});

const HomeRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      barStyle={styles.bar}
      activeColor="#6B9B51"
      inactiveColor="#CCC">
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{tabBarIcon: getIcon('explore'), title: 'Explorar'}}
      />
      <Tab.Screen
        name="Saveds"
        component={SavedsScreen}
        options={{tabBarIcon: getIcon('bookmark'), title: 'Salvos'}}
      />
      <Tab.Screen
        name="Notifications"
        component={UpdateRoutes}
        options={{
          tabBarIcon: getIcon('notifications'),
          title: 'Atualizações',
          tabBarBadge: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeRoutes;
