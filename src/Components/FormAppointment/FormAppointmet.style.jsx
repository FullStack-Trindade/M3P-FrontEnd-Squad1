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