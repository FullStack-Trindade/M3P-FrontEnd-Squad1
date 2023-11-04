import * as Styled from './CardPaciente.style';
import { ImUser } from 'react-icons/im';

const CardPaciente = ({ paciente }) => {
  return (
    <>
      <Styled.CardPacienteContainer>
        <Styled.RenderCardPaciente>
          <Styled.IconCardPaciente>
            <ImUser/>
          </Styled.IconCardPaciente>

          <Styled.DadosPaciente>
            <Styled.DadosNome>{paciente.name}</Styled.DadosNome>
            <Styled.Dados>{paciente.email}</Styled.Dados>
            <Styled.Dados>{paciente.tel}</Styled.Dados>
            <Styled.Dados>{paciente.convenio}</Styled.Dados>
          </Styled.DadosPaciente>
          
        </Styled.RenderCardPaciente>
      </Styled.CardPacienteContainer>
    </>
  );
};

export default CardPaciente;