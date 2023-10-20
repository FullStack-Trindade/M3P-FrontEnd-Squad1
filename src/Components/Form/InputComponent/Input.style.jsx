import styled from 'styled-components';

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${({ $width }) => ($width ? $width : '100%')};
`;

export const Label = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  color: ${({ $color }) => { return $color === 'danger' ? '#BE2E2E' : '#5281DC'}};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 80%;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: baseline;
  justify-items: baseline;
  flex-wrap: wrap;
  gap: 2vw;
  width: 100%;
`;