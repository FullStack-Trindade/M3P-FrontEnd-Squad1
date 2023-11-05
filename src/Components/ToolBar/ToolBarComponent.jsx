import * as Styled from './ToolBarComponent.style';
import { useContext } from 'react';

import { ThemeContext } from '../../Context/Theme.context.jsx'


import { HeaderContext } from '../../Context/Header.context';
/* import { AuthContext } from '../../Context/auth.context';
 */
function NavBarHeader() {
    const { data } = useContext(HeaderContext);
    const userName = JSON.parse(localStorage.getItem('name'));
    const { theme } = useContext(ThemeContext);

  return (
    <Styled.Container colors={theme.cores}>
      <Styled.TxtHeader colors={theme.cores} id='titulo'>
        {data.titulo}
      </Styled.TxtHeader>

      <Styled.UserHeader>
        <Styled.TxtUser>
          { userName }
        </Styled.TxtUser>
        <img
          alt="Imagem do usuário"
          src="../../../public/images/LogoGenerica.png"
        />{' '}
      </Styled.UserHeader>
    </Styled.Container>
  );
}

export default NavBarHeader;