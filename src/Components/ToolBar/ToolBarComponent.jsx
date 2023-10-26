import * as Styled from './ToolBarComponent.style';
import React, { useContext } from 'react';
import { HeaderContext } from '../../Context/Header.context';
import { AuthContext } from '../../Context/auth.context';


function NavBarHeader() {
    const { data } = useContext(HeaderContext)

    const { auth } = useContext(AuthContext)

  return (
    <Styled.Container>
      <Styled.TxtHeader id='titulo'>
        {data.titulo}
      </Styled.TxtHeader>

      <Styled.UserHeader>
        <Styled.TxtUser>
        {  auth.user.email }
        </Styled.TxtUser>
        <img
          alt="Imagem do usuário"
          src="../../../public/images/LABMedical_Logo.png"
        />{' '}
      </Styled.UserHeader>
    </Styled.Container>
  );
}

export default NavBarHeader;