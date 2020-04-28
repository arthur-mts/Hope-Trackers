import styled from 'styled-components/native';

interface Props {
  selected?: boolean;
  saved?: boolean;
}

export const Container = styled.View<Props>`
  position: relative;

  align-items: center;
  justify-content: center;

  background-color: ${(props) => (props.selected ? '#6B9B51' : '#fff')};
  margin: 1px;
  border-radius: 8px;
  height: 32px;
  width: 32px;

  border: 2px solid
    ${(props) =>
      props.saved
        ? props.selected
          ? '#333'
          : '#999'
        : props.selected
        ? '#6B9B51'
        : '#fff'};
`;

export const SavedMark = styled.View`
  position: absolute;
  top: -4px;
  right: 2px;
`;
