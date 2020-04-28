import React from 'react';
import {StyleSheet} from 'react-native';

import {BottomTabBar, BottomTabBarProps} from '@react-navigation/bottom-tabs';

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#FFF',
  },
});

const BottomTab: React.FC<BottomTabBarProps> = (props) => {
  return (
    <BottomTabBar
      {...props}
      activeTintColor="#6B9B51"
      inactiveTintColor="#DDD"
      showLabel={false}
      style={styles.bar}
    />
  );
};

export default BottomTab;
