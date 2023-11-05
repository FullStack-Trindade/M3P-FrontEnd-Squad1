import * as Styled from './MenuComponent.style';
import { ThemeContext } from '../../../Context/Theme.context.jsx'
import { useContext, useEffect } from 'react';
import MenuItemFechado from '../MenuItemFechado/MenuItemFechado';
import { 

    FaHome, 
    FaSignInAlt,
    FaPlus,
    FaTasks,
    FaLaptopMedical
} from 'react-icons/fa';

  import { ImDroplet } from 'react-icons/im';
  import { MdSoupKitchen } from 'react-icons/md';
  import { CiPill } from 'react-icons/ci';
  import { CgGym } from 'react-icons/cg';

import { AuthService } from '../../../Service/Auth.service.jsx';
import { AuthContext } from '../../../Context/auth.context.jsx';


const MenuFechado = () => {

  useEffect(() => { fetchAuth() }, []);
  const localToken = JSON.parse(localStorage.getItem('token'));

  const { idDatabase, setIdDatabase } = useContext(AuthContext);

  const fetchAuth = async() => {
    const authToken = await AuthService.Get();
    const tokenExists = await authToken.filter(auth => auth.token_user === localToken);

      if (tokenExists.length > 0) { 
        setIdDatabase(tokenExists[0]?.id);
      }
    }

  const { theme } = useContext(ThemeContext);

  const resetToken = () => {
    localStorage.clear();
    AuthService.Delete(idDatabase);
  }
   

    return (
        
            <Styled.MenuFechado colors={theme.cores}>


            <Styled.MenuLogoFechado src={'../../../public/images/LogoGenerica.png'} />

            <MenuItemFechado Icon={FaHome}  To='/' />
            <MenuItemFechado 
              Icon={FaSignInAlt}  
              To='/login' 
              onClick={() => resetToken()}
            />

            <MenuItemFechado Icon={FaPlus}  To='/paciente' />
            <MenuItemFechado Icon={FaTasks}  To='/listaProntuarios'  />

            <MenuItemFechado Icon={FaLaptopMedical}  To='/consulta' />
            <MenuItemFechado Icon={ MdSoupKitchen }  To='/dieta' />
            <MenuItemFechado Icon={ ImDroplet }  To='/exame' />
            <MenuItemFechado Icon={ CgGym }  To='/exercicio' />
            <MenuItemFechado Icon={ CiPill }  To='/medicamento' />

            </Styled.MenuFechado>

            
        
    )
}

export default MenuFechado