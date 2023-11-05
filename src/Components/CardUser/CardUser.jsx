import * as Styled from "./CardUser.style";
import { ImUser } from "react-icons/im";

const CardUser = ({ user }) => {

  return (
    <>
      <Styled.CardUserContainer>
        <Styled.RenderCardUser>
          <Styled.IconCardUser>
            <ImUser />
          </Styled.IconCardUser>
          <Styled.DadosUsuario>
            <Styled.DadosNome>{user.name}</Styled.DadosNome>
            <Styled.Dados>{user.gender}</Styled.Dados>
            <Styled.Dados>{user.cpf}</Styled.Dados>
            <Styled.Dados>{user.phone}</Styled.Dados>

        
          </Styled.DadosUsuario>
        </Styled.RenderCardUser>
      </Styled.CardUserContainer>
    </>
  );
};

export default CardUser;
