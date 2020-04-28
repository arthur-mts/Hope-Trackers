import {RectButton} from 'react-native-gesture-handler';

import styled from 'styled-components/native';

export interface ContainerProps {
  size?: number;
  backgroundColor: string;
}

export const Container = styled(RectButton)<ContainerProps>`
  align-items: center;
  justify-content: center;

  border-radius: ${({size}) => (size ? size / 2 : 26)}px;
  height: ${({size}) => size || 52}px;
  width: ${({size}) => size || 52}px;
`;
