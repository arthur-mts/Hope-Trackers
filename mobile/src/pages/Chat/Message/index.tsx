import React from 'react';

import {
  Wrapper,
  MessageWrapper,
  OwnerIndicatorWrapper,
  OwnerIndicator,
  Container,
  Text,
} from './styles';

const Message: React.FC = () => {
  return (
    <Wrapper>
      <MessageWrapper>
        <Container>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            illum odit facilis accusamus dolores unde sequi sunt veniam quidem
            voluptates eveniet incidunt saepe odio dolorum nobis reiciendis
            tempora, fugit aperiam.
          </Text>
        </Container>

        <OwnerIndicatorWrapper />
        <OwnerIndicator />
      </MessageWrapper>
    </Wrapper>
  );
};

export default Message;
