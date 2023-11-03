import styled from 'styled-components';
import { Link } from 'react-router-dom'


export const Container = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1A202C; 
  font-size: .9rem;
  color: #483D8B;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  margin: 0 auto;
  border: 1px solid #483D8B;
  background-color: transparent;
  width: 17vw;
  text-decoration: none;

  > svg {
    margin: 0 20px;
  }

  &:hover {
    border: 3px solid white;
  }
`;