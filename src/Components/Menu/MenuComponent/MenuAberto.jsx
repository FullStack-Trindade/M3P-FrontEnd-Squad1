import * as Styled from './MenuComponent.style';
import MenuItem from '../MenuItem/MenuItem';

import React from 'react'
import { 
  FaHome, 
  FaSignInAlt,
  FaPlus,
  FaTasks,
  FaLaptopMedical

} from 'react-icons/fa';

import { ImDroplet } from 'react-icons/im';

const MenuAberto = () => {

    return (
        <>

        
        <Styled.MenuContainer >
              <Styled.MenuArea>
            <Styled.MenuLogo src={'../../../../public/images/LABMedical_Logo.png'} alt='Logo LAB Medical'/>
          
            <Styled.MenuSetor>Geral</Styled.MenuSetor>
            <MenuItem Icon={FaHome} Text="INICIO" To='/' />
            <MenuItem Icon={FaSignInAlt} Text="SAIR" To='/login' />

            <Styled.MenuSetor>Pacientes</Styled.MenuSetor>
            <MenuItem Icon={FaPlus} Text="CADASTRAR" To='/paciente' />
            <MenuItem Icon={FaTasks} Text="LISTAR PRONTUÁRIO" To='/listaProntuarios'  />

            <Styled.MenuSetor>Exames</Styled.MenuSetor>
            <MenuItem Icon={FaLaptopMedical} Text="CADASTRAR CONSULTA" To='/consulta' />
            <MenuItem Icon={ImDroplet} Text="CADASTRAR EXAME" To='/exame' />
        </Styled.MenuArea>


                                      
              
            
         </Styled.MenuContainer>
        </>
    )
  }
  
  export default MenuAberto