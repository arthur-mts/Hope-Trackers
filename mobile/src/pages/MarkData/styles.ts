import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RectButton} from 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import styled from 'styled-components/native';

export const Wrapper = styled.View``;

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const Image = styled(FastImage)`
  height: ${Dimensions.get('window').width * 0.8}px;
  width: ${Dimensions.get('window').width}px;
`;

export const HeaderWrapper = styled.View`
  position: relative;
`;

export const Header = styled.View`
  align-items: center;
  position: absolute;
  padding: 4px 8px;
  top: ${getStatusBarHeight()}px;
`;

export const BackButton = styled(RectButton).attrs({
  rippleColor: '#FFF',
})`
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0);
  border-radius: 8px;
  height: 48px;
  width: 48px;
`;

export const Title = styled.Text`
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const Description = styled.Text`
  color: #666;
  font-size: 14px;
  text-align: justify;
  line-height: 20px;
  margin-bottom: 8px;
`;

export const LabelWrapper = styled.View`
  padding: 12px 16px;
  border-radius: 8px;
  background: #ddd;
  margin: 8px 0;
`;

export const Label = styled.Text`
  text-transform: uppercase;
  color: #777;
  font-size: 13px;
  letter-spacing: 1px;
  margin-bottom: 4px;
`;

export const HourContainer = styled.View`
  margin-top: 2px;
  align-items: center;
  flex-direction: row;
`;

export const Hour = styled.Text`
  font-size: 15px;
  color: #666;
`;

export const HourState = styled.Text`
  font-size: 15px;
  color: #666;
`;

export const HourSeparator = styled.View`
  margin: 0 6px;

  background: #666;
  border-radius: 3px;
  height: 5px;
  width: 5px;
`;

export const Link = styled.Text`
  margin-top: 2px;
  font-size: 15px;
  color: #666;
  font-weight: bold;
`;
