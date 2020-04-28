import FastImage from 'react-native-fast-image';
import {RectButton} from 'react-native-gesture-handler';

import styled from 'styled-components/native';

export const Wrapper = styled.View`
  position: absolute;
  align-items: flex-end;
  z-index: 1;
  bottom: 16px;
  left: 0;
  right: 0;
`;

export const ButtonWrapper = styled.View`
  align-items: flex-end;
  padding: 16px;
`;

export const Container = styled(RectButton)`
  flex-direction: row;
  align-items: center;

  margin: 1px 0;

  border-radius: 8px;
  background: #fff;
  padding-right: 16px;
`;

export const Image = styled(FastImage)`
  height: 72px;
  width: 72px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
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
  numberOfLines: 1,
})`
  margin: 2px 0;
  font-size: 13px;
  color: #999;
`;

export const Status = styled.Text`
  font-size: 13px;
  color: #6b9b51;
  font-weight: bold;
`;
