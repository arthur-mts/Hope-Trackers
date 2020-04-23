import React from 'react';
import {RectButtonProperties} from 'react-native-gesture-handler';

import {Container, Text} from './styles';

const Button: React.FC<RectButtonProperties> = ({children}) => {
  return (
    <Container>
      <Text>{children}</Text>
    </Container>
  );
};

export default Button;
