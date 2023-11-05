import styled from 'styled-components';

export const AreaCadastro = styled.div`
  display: flex;
  
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: white;
  margin: 0 auto;
`;


export const AreaPaciente = styled.div`
  display: flex;
  justify-content: center;

  width: 90%;
  height: 80%;
  color: white;
  margin: 0;
  box-shadow: 5px 5px 10px gray;
  border-radius: 5px;
  border: 5px solid black
`;

export const Title = styled.h1`
  display: flex;
  align-items: column;
  color: gray;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 100%;
  margin: 2% 5%;

`;

export const Label = styled.legend`
  color: #5281DC;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  
`;