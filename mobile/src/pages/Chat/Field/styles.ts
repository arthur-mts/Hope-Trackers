import {RectButton} from 'react-native-gesture-handler';

import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  flex-direction: row;
  padding: 12px;
`;

export const Input = styled.TextInput`
  background: #eee;
  border-radius: 8px;
  height: 40px;
  padding: 0 16px;
  margin-right: 12px;

  flex: 1;
`;

export const SendButton = styled(RectButton)`
  align-items: center;
  justify-content: center;

  background: #666;
  border-radius: 8px;
  height: 40px;
  width: 40px;
`;
