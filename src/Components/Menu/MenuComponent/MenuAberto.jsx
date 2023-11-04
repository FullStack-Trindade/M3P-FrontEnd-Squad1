import * as Styled from "./MenuComponent.style";
import MenuItem from "../MenuItem/MenuItem";

import React from "react";
import {
  FaHome,
  FaSignInAlt,
  FaPlus,
  FaTasks,
  FaLaptopMedical,
  FaPills,
} from "react-icons/fa";

import { ImDroplet } from "react-icons/im";

const MenuAberto = () => {
  return (
    <>
      <Styled.MenuContainer>
        <Styled.MenuArea>
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

          <Styled.MenuSetor>Médico</Styled.MenuSetor>
          <MenuItem
            Icon={FaLaptopMedical}
            Text="CADASTRAR CONSULTA"
            To="/consulta"
          />
          <MenuItem Icon={ImDroplet} Text="CADASTRAR EXAME" To="/exame" />

          <Styled.MenuSetor>Enfermeiro</Styled.MenuSetor>
          <MenuItem
            Icon={FaPills}
            Text="MEDICAMENTO"
            To="/medicamento"
          />
        </Styled.MenuArea>
      </Styled.MenuContainer>
    </>
  );
};

export default MenuAberto;
