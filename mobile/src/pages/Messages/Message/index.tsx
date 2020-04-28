import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {Container, Image, Infos, Description, Header, Date} from './styles';

const uri =
  'https://lh3.googleusercontent.com/j2xbcbh4wrU9r8hAw5xBWbIubJi35xOBRxFeaOlKFSJ_REj3h-fEEGUBREDCYxPxqsMj69wa=w1080-h608-p-no-v0';

const Message: React.FC = () => {
  const {navigate} = useNavigation();

  return (
    <Container onPress={() => navigate('Chat')}>
      <Image source={{uri}} />

      <Infos>
        <Header>Super Esperança Supermercado</Header>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          vel deleniti soluta fugit voluptate minima nisi natus eos quae
          aspernatur odit eum eligendi veniam tempora, quibusdam, repellat at ad
          aut.
        </Description>
      </Infos>

      <Date>há 5 min</Date>
    </Container>
  );
};

export default Message;
