import React from 'react';
import {Marker, LatLng} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Shadow from '~/components/Shadow';

import {Container, SavedMark} from './styles';

interface Props {
  icon: string;
  coordinate: LatLng;
  selected?: boolean;
  saved?: boolean;
  onPress(): void;
}

const Mark: React.FC<Props> = ({
  icon,
  coordinate,
  onPress,
  selected = false,
  saved = false,
}) => {
  return (
    <Marker {...{coordinate, onPress}}>
      <Shadow
        settings={{
          border: 2,
          opacity: 0.05,
          radius: 12,
          height: 34,
          width: 34,
        }}>
        <Container {...{saved, selected}}>
          <Icon name={icon} size={20} color={selected ? '#FFF' : '#999'} />
          {saved && (
            <SavedMark>
              <Icon
                name="bookmark"
                color={selected ? '#333' : '#999'}
                size={12}
              />
            </SavedMark>
          )}
        </Container>
      </Shadow>
    </Marker>
  );
};

export default Mark;
