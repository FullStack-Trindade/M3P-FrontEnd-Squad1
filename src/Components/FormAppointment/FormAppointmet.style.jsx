import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Form = styled.form`
  display: inline-flex;
  padding: 2rem;
  width: 100%;
  height: auto;
  flex-direction: column;
  justify-content: center;
  margin-top: 5%;
  gap: 1rem;
  border-radius: 0.625rem;
  background: #FFF;
  box-shadow: 5px 5px 5px gray;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
`;

export const Paragraph = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: #ff5555;
  margin-bottom: 0;
`;

export const InputGroup = styled.div`
  display: flex;
  padding: 0.325rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  width: ${({ $width }) => ($width ? $width : '100%')};
  height: ${({ $height }) => ($height ? $height : 'auto ')};
`;

export const Button = styled.button`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: ${({$width}) => $width ? $width : '95%'};
  border-radius: 0.3125rem;
  background: ${({ $outlined }) => { return $outlined ? 'transparent' : 'rgba(82, 129, 220, 1)'}};
  border:  ${({ $outlined }) => { return !$outlined ? 0 : '1px solid rgba(82, 129, 220, 1)'}};
  color: ${({ $outlined }) => { return !$outlined ? '#EFEFEF' : 'rgba(82, 129, 220, 1)'}};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  opacity: ${({$active}) => { return $active ? 1 : .5 }};
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
`;

Button.propTypes = {
  $outlined: PropTypes.bool
}