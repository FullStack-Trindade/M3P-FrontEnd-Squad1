import styled from 'styled-components';
import { Link } from 'react-router-dom'


export const Container = styled(Link)`
  display: flex;
  align-items: center;
  background-color: #1A202C; 
  font-size: .9rem;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  margin: 15% auto 1rem;
  border: 1px solid white;
  background-color: transparent;
  width: 5vw;
  text-decoration: none;

  > svg {
    margin: auto;
  }

  &:hover {
    border: 3px solid white;
  }
`;