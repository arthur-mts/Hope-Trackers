import FastImage from 'react-native-fast-image';
import {RectButton} from 'react-native-gesture-handler';

import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  flex-direction: row;
  align-items: center;

  margin: 1px 0;

  height: 72px;
  background: rgba(255, 255, 255, 0);
  border-radius: 8px;
  padding: 0 12px;
`;

export const Image = styled(FastImage)`
  height: 48px;
  width: 48px;
  border-radius: 8px;
`;

export const Infos = styled.View`
  margin: 0 16px;
  flex: 1;
`;

export const Header = styled.Text`
  font-size: 16px;
  color: #333;
`;

export const Description = styled.Text.attrs({
  numberOfLines: 2,
})`
  margin: 2px 0;
  font-size: 13px;
  color: #999;
`;

export const Date = styled.Text`
  font-size: 12px;
  color: #666;
`;
