import {getStatusBarHeight} from 'react-native-status-bar-height';

import styled from 'styled-components/native';

export const Container = styled.View`
  padding-top: ${getStatusBarHeight()}px;
  background: #fff;
`;
