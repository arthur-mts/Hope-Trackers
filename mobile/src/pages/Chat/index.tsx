import React, {useCallback} from 'react';
import {FlatList} from 'react-native-gesture-handler';

import Field from './Field';
import Header from './Header';
import Message from './Message';
import {Container, Separator} from './styles';

const Chat: React.FC = () => {
  const data = ['1', '2'];

  const renderItem = useCallback(() => {
    return <Message />;
  }, []);

  return (
    <Container>
      <Header />

      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        inverted={true}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Separator />}
        contentContainerStyle={{
          padding: 16,
        }}
        getItemLayout={(_, index) => ({
          length: 72,
          offset: 72 * index,
          index,
        })}
      />

      <Field />
    </Container>
  );
};

export default Chat;
