import * as Styled from "./MenuComponent.style";
import MenuItem from "../MenuItem/MenuItem";
import { ThemeContext } from '../../../Context/Theme.context.jsx'
import { useContext,  useEffect } from 'react';
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

import { AuthService } from "../../../Service/Auth.service.jsx";
import { AuthContext } from "../../../Context/auth.context.jsx";

const MenuAberto = () => {

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

      <Styled.MenuContainer colors={theme.cores}>
        <Styled.MenuArea colors={theme.cores}>
          <Styled.MenuLogo
            src={"../../../public/images/LogoGenerica.png"}
            alt="Logo LAB Medical"
          />

          <Styled.MenuSetor>Geral</Styled.MenuSetor>
          <MenuItem Icon={FaHome} Text="INICIO" To="/" />
          <MenuItem 
            Icon={FaSignInAlt} 
            Text="SAIR" 
            To="/login"
            onClick={() => resetToken()}
          />

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
