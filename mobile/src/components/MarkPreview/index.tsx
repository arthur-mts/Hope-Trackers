import React, {
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import {Dimensions} from 'react-native';
import Animated, {interpolate} from 'react-native-reanimated';
import {useTransition} from 'react-native-redash';
import Carousel, {CarouselStatic} from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useNavigation} from '@react-navigation/native';

import BoxShadow from '~/components/Shadow';
import {MarkData} from '~/schemas/Mark';

import {
  Wrapper,
  Container,
  Image,
  Infos,
  Header,
  Description,
  Status,
} from './styles';

export interface Handlers {
  selectItem(mark: MarkData): void;
  dismiss(): void;
}

interface Props {
  data: MarkData[];
  onCurrentItemChange(mark: MarkData): void;
}

const uri =
  'https://lh3.googleusercontent.com/j2xbcbh4wrU9r8hAw5xBWbIubJi35xOBRxFeaOlKFSJ_REj3h-fEEGUBREDCYxPxqsMj69wa=w1080-h608-p-no-v0';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SCREEN_WIDTH - 64;

const MarkPreview: React.RefForwardingComponent<Handlers, Props> = (
  {data, onCurrentItemChange},
  ref,
) => {
  const {navigate} = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const carouselRef = useRef<CarouselStatic<MarkData>>(null);

  const transition = useTransition(expanded);

  const translateY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [90, 0],
  });

  const onSnapItem = useCallback(
    (index: number) => {
      onCurrentItemChange(data[index]);
    },
    [data, onCurrentItemChange],
  );

  const selectItem = useCallback(
    (mark: MarkData) => {
      setExpanded(true);

      const index = data.indexOf(mark);
      carouselRef.current?.snapToItem(index);
    },
    [data, carouselRef],
  );

  const dismiss = useCallback(() => {
    setExpanded(false);
  }, []);

  useImperativeHandle<{}, Handlers>(
    ref,
    () => ({
      selectItem,
      dismiss,
    }),
    [selectItem, dismiss],
  );

  function renderItem() {
    return (
      <BoxShadow
        settings={{
          height: 74,
          border: 2,
          opacity: 0.1,
          radius: 8,
          width: ITEM_WIDTH,
        }}>
        <Container onPress={() => navigate('MarkData')}>
          <Image source={{uri}} />
          <Infos>
            <Header>Super Esperança Supermercado</Header>

            <Description>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
              labore, necessitatibus fuga cum debitis nostrum vitae magnam
              aliquid. Nihil architecto ad eveniet aliquid ut sequi sint
              repellat mollitia veritatis vel.
            </Description>

            <Status>Aberto - fecha as 18:30</Status>
          </Infos>

          <Icon name="bookmark-border" size={24} color="#999" />
        </Container>
      </BoxShadow>
    );
  }

  return (
    <Wrapper>
      <Animated.View style={{translateY}}>
        <Carousel
          ref={carouselRef}
          data={data}
          renderItem={renderItem}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={ITEM_WIDTH}
          onBeforeSnapToItem={onSnapItem}
        />
      </Animated.View>
    </Wrapper>
  );
};

export default forwardRef(MarkPreview);
