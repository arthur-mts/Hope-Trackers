import {Dimensions, StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

import styled from 'styled-components/native';

export const Wrapper = styled.View`
  align-items: flex-end;
`;

export const MessageWrapper = styled.View`
  position: relative;
  background: #fff;

  border: ${StyleSheet.hairlineWidth}px solid #999;
  width: ${Dimensions.get('window').width * 0.8}px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const OwnerIndicatorWrapper = styled.View`
  position: absolute;
  top: -${StyleSheet.hairlineWidth}px;
  right: -8px;

  border-style: solid;
  border-right-width: 8px;
  border-top-width: 12px;
  border-right-color: transparent;
  border-top-color: #999;

  height: 0px;
  width: 0px;
`;

export const OwnerIndicator = styled.View`
  position: absolute;
  top: 0;
  right: -${StyleSheet.hairlineWidth + 7}px;

  border-style: solid;
  border-right-width: 8px;
  border-top-width: 12px;
  border-right-color: transparent;
  border-top-color: #fff;

  height: 0px;
  width: 0px;
`;

export const Container = styled.View`
  background: #fff;
  padding: 8px 12px;
  border-radius: 8px;

  flex: 0;
`;

export const Text = styled.Text`
  color: #666;
  line-height: 18px;
  text-align: justify;
`;
