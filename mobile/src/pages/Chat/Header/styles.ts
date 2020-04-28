import FastImage from 'react-native-fast-image';
import {RectButton} from 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 8px;
  background: #fff;
  flex-direction: row;
  align-items: center;
  height: ${56 + getStatusBarHeight()}px;
  padding-top: ${getStatusBarHeight()}px;
`;

export const BackButton = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  padding: 8px;
  padding-right: 12px;
  border-radius: 8px;

  margin-right: 8px;
`;

export const InfoButton = styled(RectButton)`
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0);
  height: 40px;
  width: 40px;
`;

export const Image = styled(FastImage)`
  border-radius: 8px;
  height: 28px;
  width: 28px;
  margin-left: 4px;
`;

export const Name = styled.Text`
  font-size: 18px;
  color: #666;
  flex: 1;
`;
