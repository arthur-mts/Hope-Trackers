import React, {useCallback} from 'react';
import {FlatList} from 'react-native';

import Notification from './Notification';

const Notifications: React.FC = () => {
  const data = ['1', '2'];

  const renderItem = useCallback(() => {
    return <Notification />;
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 8,
        paddingTop: 8,
      }}
      getItemLayout={(_, index) => ({
        length: 72,
        offset: 72 * index,
        index,
      })}
    />
  );
};

export default Notifications;
