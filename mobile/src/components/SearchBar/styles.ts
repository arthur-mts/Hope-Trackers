import FastImage from 'react-native-fast-image';
import {RectButton} from 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import styled from 'styled-components/native';

export const Wrapper = styled.View`
  position: absolute;
  top: ${getStatusBarHeight() + 16}px;
  left: 16px;
  right: 16px;

  z-index: 3;
`;

export const IconWrapper = styled.View`
  align-items: center;
  justify-content: center;

  margin-left: 4px;

  height: 48px;
  width: 48px;
`;

export const Container = styled(RectButton)`
  flex-direction: row;
  align-items: center;

  background-color: #fff;
  border-radius: 8px;
  height: 48px;
`;

export const Field = styled.Text`
  flex: 1;
  font-size: 16px;
  line-height: 16px;
  margin-left: 8px;
  color: #999;
`;

export const ProfilePictureWrapper = styled(RectButton)`
  align-items: center;
  justify-content: center;

  background-color: rgba(255, 255, 255, 0);

  border-radius: 8px;
  padding: 2px;
  margin-right: 16px;
`;

export const ProfilePicture = styled(FastImage)`
  background-color: #ddd;

  border-radius: 8px;
  height: 32px;
  width: 32px;
`;
