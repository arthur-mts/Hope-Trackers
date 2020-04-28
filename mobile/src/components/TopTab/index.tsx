import React from 'react';
import {StyleSheet} from 'react-native';

import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';

import {Container} from './styles';

const styles = StyleSheet.create({
  elevated: {
    elevation: 4,
  },
  indicator: {
    backgroundColor: '#6B9B51',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    height: 3,
  },
  tab: {
    paddingHorizontal: 8,
  },
  bar: {
    elevation: 0,
    marginHorizontal: 64,
    backgroundColor: 'transparent',
  },
});

const TopTab: React.FC<MaterialTopTabBarProps> = (props) => {
  return (
    <Container style={styles.elevated}>
      <MaterialTopTabBar
        {...props}
        activeTintColor="#333"
        inactiveTintColor="#999"
        indicatorStyle={styles.indicator}
        tabStyle={styles.tab}
        style={styles.bar}
      />
    </Container>
  );
};

export default TopTab;
