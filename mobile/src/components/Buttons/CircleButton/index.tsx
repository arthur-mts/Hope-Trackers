import React from 'react';
import {RectButtonProperties} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BoxShadow from '~/components/Shadow';

import {Container, ContainerProps} from './styles';

interface Props extends ContainerProps, RectButtonProperties {
  icon: string;
  iconColor?: string;
  iconSize?: number;
}

const Circle: React.FC<Props> = ({
  backgroundColor,
  icon: name,
  iconColor: color = '#333',
  iconSize = 24,
  size = 52,
  ...rest
}) => {
  return (
    <BoxShadow
      settings={{
        height: size,
        border: 2,
        opacity: 0.1,
        radius: size / 2,
        width: size,
      }}>
      <Container {...{size, backgroundColor, ...rest}}>
        <Icon {...{name, color}} size={iconSize} />
      </Container>
    </BoxShadow>
  );
};

export default Circle;
