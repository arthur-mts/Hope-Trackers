import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, Input, SendButton} from './styles';

const styles = StyleSheet.create({
  elevated: {
    elevation: 8,
  },
});

const Field: React.FC = () => {
  return (
    <Container style={styles.elevated}>
      <Input placeholder="Digite sua mensagem" />

      <SendButton>
        <Icon name="send" size={20} color="#FFF" />
      </SendButton>
    </Container>
  );
};

export default Field;
