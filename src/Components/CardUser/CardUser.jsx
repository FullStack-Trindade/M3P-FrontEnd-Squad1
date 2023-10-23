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

          <Styled.DadosUsuario>
            <Styled.DadosNome>{user.nome}</Styled.DadosNome>
            <Styled.Dados>{user.cpf}</Styled.Dados>
            <Styled.Dados>{user.tel}</Styled.Dados>
            <Styled.Dados>{user.tipo}</Styled.Dados>
          </Styled.DadosUsuario>
          
        </Styled.RenderCardUser>
      </Styled.CardUserContainer>
    </>
  );
};

export default CardUser;