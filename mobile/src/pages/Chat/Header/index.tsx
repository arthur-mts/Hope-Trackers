import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useNavigation} from '@react-navigation/native';

import {Container, BackButton, Image, Name, InfoButton} from './styles';

const uri =
  'https://lh3.googleusercontent.com/j2xbcbh4wrU9r8hAw5xBWbIubJi35xOBRxFeaOlKFSJ_REj3h-fEEGUBREDCYxPxqsMj69wa=w1080-h608-p-no-v0';

const styles = StyleSheet.create({
  elevated: {
    elevation: 4,
  },
});

const Header: React.FC = () => {
  const {goBack, navigate} = useNavigation();

  return (
    <Container style={styles.elevated}>
      <BackButton onPress={() => goBack()}>
        <Icon name="arrow-back" size={24} color="#666" />
        <Image source={{uri}} />
      </BackButton>
      <Name>Header</Name>
      <InfoButton onPress={() => navigate('MarkData')}>
        <Icon name="info" size={24} color="#666" />
      </InfoButton>
    </Container>
  );
};

export default Header;
