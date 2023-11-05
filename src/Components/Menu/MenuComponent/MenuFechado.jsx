import * as Styled from './MenuComponent.style';
import { ThemeContext } from '../../../Context/Theme.context.jsx'
import { useContext} from 'react';
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



const MenuFechado = () => {
   
    const { theme } = useContext(ThemeContext);

    return (
        
            <Styled.MenuFechado colors={theme.cores}>


            <Styled.MenuLogoFechado src={'../../../public/images/LogoGenerica.png'} />

            <MenuItemFechado Icon={FaHome}  To='/' />
            <MenuItemFechado Icon={FaSignInAlt}  To='/login' />

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