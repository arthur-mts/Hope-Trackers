import React from 'react';
import {StyleSheet} from 'react-native';
import {RectButtonProperties} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Wrapper, Container, WrapperProps, ContainerProps} from './styles';

interface Props extends ContainerProps, WrapperProps, RectButtonProperties {
  icon: string;
  iconColor: string;
  iconSize?: number;
}

const styles = StyleSheet.create({
  elevated: {elevation: 8},
});

const Floating: React.FC<Props> = ({
  backgroundColor,
  icon: name,
  iconColor: color,
  iconSize = 24,
  size,
  position,
  ...rest
}) => {
  return (
    <Wrapper {...{position}}>
      <Container {...{size, backgroundColor, ...rest}} style={styles.elevated}>
        <Icon {...{name, color}} size={iconSize} />
      </Container>
    </Wrapper>
  );
};

export default Floating;
