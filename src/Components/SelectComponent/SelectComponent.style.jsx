import styled from 'styled-components';

export const SelectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: ${({ $width }) => ($width ? $width : '100%')};

`


export const Label = styled.label`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  color: ${({$color}) => { return $color === 'danger' ? '#BE2E2E' : '#5281DC'}};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 100%;

`;


export const Select = styled.select`
  display: flex;
  padding: 0.25rem;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 0.2rem;
  border: 1px solid ${({$color}) => { return $color === 'danger' ? '#BE2E2E' : '#5281DC'}};
  width: 100%;
`;

export const TextArea = styled.textarea`
  display: flex;
  padding: 0.5rem;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 0.3125rem;
  border: 1px solid ${({$color}) => { return $color === 'danger' ? '#BE2E2E' : '#5281DC'}};;
`;


