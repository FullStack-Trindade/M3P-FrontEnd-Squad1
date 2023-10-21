import * as Styled from './CardUser.style';
import { ImUser } from 'react-icons/im';

const CardUser = ({ user }) => {
console.log(user)
  return (
    <>
      <Styled.CardUserContainer>
        <Styled.RenderCardUser>
          <Styled.IconCardUser>
            <ImUser/>
          </Styled.IconCardUser>

          <Styled.DadosPaciente>
            <Styled.DadosNome>{user.nome}</Styled.DadosNome>
            <Styled.Dados>{user.nasc}</Styled.Dados>
            <Styled.Dados>{user.tel}</Styled.Dados>
            <Styled.Dados>{user.convenio}</Styled.Dados>
          </Styled.DadosPaciente>
          
        </Styled.RenderCardUser>
      </Styled.CardUserContainer>
    </>
  );
};

export default CardUser;