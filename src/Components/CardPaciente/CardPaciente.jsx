import * as Styled from './CardPaciente.style';
import { ImUser } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

const CardPaciente = ({ paciente }) => {
  
  const navigate = useNavigate();
  return (
    <>
      <Styled.CardPacienteContainer>
        <Styled.RenderCardPaciente>
          <Styled.IconCardPaciente>
            <ImUser/>
          </Styled.IconCardPaciente>

          <Styled.DadosPaciente>
            <Styled.DadosNome>{paciente.name} </Styled.DadosNome>
            <Styled.Dados>{paciente.email}</Styled.Dados>
            <Styled.Dados>{paciente.tel}</Styled.Dados>
            <Styled.Dados>{paciente.convenio}</Styled.Dados>
          </Styled.DadosPaciente>
          
          <Styled.DadosBtn onClick={() => navigate('/paciente/id', { replace: true })}>Dados</Styled.DadosBtn>
      
        </Styled.RenderCardPaciente>
      </Styled.CardPacienteContainer>
    </>
  );
};

export default CardPaciente;