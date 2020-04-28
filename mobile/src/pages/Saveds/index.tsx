import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {MarkData} from '~/schemas/Mark';

import SavedMark from './SavedMark';

const Saveds: React.FC = () => {
  const data: MarkData[] = [
    {
      id: '1',
      lat: 0,
      lng: 0,
      mark: 'Testing',
      saved: true,
    },
    {
      id: '2',
      lat: 0,
      lng: 0,
      mark: 'Testing',
      saved: true,
    },
    {
      id: '3',
      lat: 0,
      lng: 0,
      mark: 'Testing',
      saved: true,
    },
    {
      id: '4',
      lat: 0,
      lng: 0,
      mark: 'Testing',
      saved: true,
    },
  ];

  const renderItem = useCallback(({item}: {item: MarkData}) => {
    return <SavedMark data={item} />;
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingTop: getStatusBarHeight() + 8,
        paddingHorizontal: 8,
      }}
      showsVerticalScrollIndicator={false}
      getItemLayout={(_, index) => ({
        length: 72,
        offset: 72 * index,
        index,
      })}
    />
  );
};

export default Saveds;
