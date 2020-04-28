import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useNavigation} from '@react-navigation/native';

import {MarkData} from '~/schemas/Mark';

import {Container, Image, Infos, Header, Description, Status} from './styles';

interface Props {
  data: MarkData;
}

const uri =
  'https://lh3.googleusercontent.com/j2xbcbh4wrU9r8hAw5xBWbIubJi35xOBRxFeaOlKFSJ_REj3h-fEEGUBREDCYxPxqsMj69wa=w1080-h608-p-no-v0';

const SavedMark: React.FC<Props> = () => {
  const {navigate} = useNavigation();

  return (
    <Container onPress={() => navigate('MarkData')}>
      <Image source={{uri}} />
      <Infos>
        <Header>Super Esperança Supermercado</Header>

        <Description>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
          labore, necessitatibus fuga cum debitis nostrum vitae magnam aliquid.
          Nihil architecto ad eveniet aliquid ut sequi sint repellat mollitia
          veritatis vel.
        </Description>

        <Status>Aberto - fecha as 18:30</Status>
      </Infos>

      <Icon name="bookmark-border" size={24} color="#999" />
    </Container>
  );
};

export default SavedMark;
