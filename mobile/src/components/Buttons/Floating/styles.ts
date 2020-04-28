import {RectButton} from 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import styled, {css} from 'styled-components/native';

import {Position} from './types';

export interface WrapperProps {
  position: Position;
}

export const Wrapper = styled.View<WrapperProps>`
  position: absolute;

  left: 16px;
  right: 16px;

  ${({position}) => {
    switch (position) {
      case 'BOTTOM_CENTER':
        return css`
          align-items: center;
          bottom: 16px;
        `;
      case 'BOTTOM_LEFT':
        return css`
          align-items: flex-start;
          bottom: 16px;
        `;
      case 'BOTTOM_RIGHT':
        return css`
          align-items: flex-end;
          bottom: 16px;
        `;
      case 'TOP_CENTER':
        return css`
          align-items: center;
          top: ${() => 16 + getStatusBarHeight()}px;
        `;
      case 'TOP_LEFT':
        return css`
          align-items: flex-start;
          top: ${() => 16 + getStatusBarHeight()}px;
        `;
      case 'TOP_RIGHT':
        return css`
          align-items: flex-end;
          top: ${() => 16 + getStatusBarHeight()}px;
        `;
    }
  }}
`;

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
