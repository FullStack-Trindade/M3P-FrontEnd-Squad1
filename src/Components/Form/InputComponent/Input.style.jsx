import styled from 'styled-components';

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${({ $width }) => ($width ? $width : '100%')};
`;