import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useNavigation} from '@react-navigation/native';

import {
  Wrapper,
  Container,
  HeaderWrapper,
  Header,
  BackButton,
  Image,
  Title,
  LabelWrapper,
  Description,
  Label,
  HourContainer,
  Hour,
  HourState,
  HourSeparator,
  Link,
} from './styles';

const uri =
  'https://lh3.googleusercontent.com/j2xbcbh4wrU9r8hAw5xBWbIubJi35xOBRxFeaOlKFSJ_REj3h-fEEGUBREDCYxPxqsMj69wa=w1080-h608-p-no-v0';

const MarkData: React.FC = () => {
  const {goBack} = useNavigation();

  return (
    <Wrapper>
      <HeaderWrapper>
        <Image source={{uri}} />

        <Header>
          <BackButton onPress={() => goBack()}>
            <Icon name="arrow-back" size={24} color="#FFF" />
          </BackButton>
        </Header>
      </HeaderWrapper>

      <Container>
        <Title>Super Esperança Supermercado</Title>

        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          ea minus veniam eos! Quos quod magnam fuga hic voluptates, reiciendis,
          perferendis odio nemo voluptatum tempora, adipisci eveniet suscipit
          dolor enim!
        </Description>

        <LabelWrapper>
          <Label>Horários</Label>
          <HourContainer>
            <Hour>Segunda-Feira</Hour>
            <HourSeparator />
            <Hour>07:30 às 11:30 e das 13:00 às 17:00</Hour>
          </HourContainer>
          <HourContainer>
            <Hour>Terça-Feira</Hour>
            <HourSeparator />
            <Hour>07:30 às 11:30 e das 13:00 às 17:00</Hour>
          </HourContainer>
          <HourContainer>
            <HourState>Hoje</HourState>
            <HourSeparator />
            <Hour>Aberto - Fecha às 18:00</Hour>
          </HourContainer>
        </LabelWrapper>

        <LabelWrapper>
          <Label>Contato</Label>
          <Link>Facebook</Link>
          <Link>WhatsApp</Link>
        </LabelWrapper>
      </Container>
    </Wrapper>
  );
};

export default MarkData;
