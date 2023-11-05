import * as Styled from "./MenuComponent.style";
import MenuItem from "../MenuItem/MenuItem";
import { ThemeContext } from '../../../Context/Theme.context.jsx'
import { useContext} from 'react';
import {
  FaHome,
  FaSignInAlt,
  FaPlus,
  FaTasks,
  FaLaptopMedical,
} from "react-icons/fa";

import { ImDroplet } from "react-icons/im";
import { MdSoupKitchen } from 'react-icons/md';
import { CiPill } from 'react-icons/ci';
import { CgGym } from 'react-icons/cg';

const MenuAberto = () => {

  const { theme } = useContext(ThemeContext);

  return (

      <Styled.MenuContainer colors={theme.cores}>
        <Styled.MenuArea colors={theme.cores}>
          <Styled.MenuLogo
            src={"../../../public/images/LogoGenerica.png"}
            alt="Logo LAB Medical"
          />

          <Styled.MenuSetor>Geral</Styled.MenuSetor>
          <MenuItem Icon={FaHome} Text="INICIO" To="/" />
          <MenuItem Icon={FaSignInAlt} Text="SAIR" To="/login" />

          <Styled.MenuSetor>Pacientes</Styled.MenuSetor>
          <MenuItem Icon={FaPlus} Text="CADASTRAR PACIENTE" To="/paciente" />
          <MenuItem
            Icon={FaTasks}
            Text="LISTAR PRONTUÁRIO"
            To="/listaProntuarios"
          />

          <Styled.MenuSetor>Cadastros</Styled.MenuSetor>
            <MenuItem
              Icon={FaLaptopMedical}
              Text="CADASTRAR CONSULTA"
              To="/consulta"
            />
            <MenuItem 
              Icon={MdSoupKitchen} 
              Text="CADASTRAR DIETA" 
              To="/dieta" 
            />
            <MenuItem 
              Icon={ImDroplet} 
              Text="CADASTRAR EXAME" 
              To="/exame" 
            />
            <MenuItem 
              Icon={CgGym} 
              Text="CADASTRAR EXERCÍCIO" 
              To="/exercicio" 
            />
            <MenuItem 
              Icon={CiPill} 
              Text="CADASTRAR MEDICAMENTO" 
              To="/medicamento" 
            />
        </Styled.MenuArea>
      </Styled.MenuContainer>
      
  );
};

export default MenuAberto;
