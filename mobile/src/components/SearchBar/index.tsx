import React from 'react';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useNavigation} from '@react-navigation/native';

import BoxShadow from '~/components/Shadow';

import {
  Wrapper,
  Container,
  IconWrapper,
  Field,
  ProfilePicture,
  ProfilePictureWrapper,
} from './styles';

const uri =
  'https://lh3.googleusercontent.com/j2xbcbh4wrU9r8hAw5xBWbIubJi35xOBRxFeaOlKFSJ_REj3h-fEEGUBREDCYxPxqsMj69wa=w1080-h608-p-no-v0';

const SearchBar: React.FC = () => {
  const {navigate} = useNavigation();

  return (
    <>
      <Wrapper>
        <BoxShadow
          settings={{
            height: 48,
            border: 2,
            opacity: 0.1,
            radius: 8,
            width: Dimensions.get('window').width - 32,
          }}>
          <Container onPress={() => navigate('Search')}>
            <IconWrapper>
              <Icon name="search" size={24} color="#999" />
            </IconWrapper>

            <Field>Pesquisar</Field>

            <ProfilePictureWrapper onPress={() => navigate('Profile')}>
              <ProfilePicture source={{uri}} />
            </ProfilePictureWrapper>
          </Container>
        </BoxShadow>
      </Wrapper>
    </>
  );
};

export default SearchBar;
