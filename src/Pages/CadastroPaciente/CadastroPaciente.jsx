import * as Styled from "./CadastroPaciente.style";
import { useContext, useEffect } from "react";
import { HeaderContext } from "../../Context/Header.context";

import { FormPaciente } from "../../Components/FormPaciente/FormPaciente";

export const PacientePage = () => {
  const { setData } = useContext(HeaderContext);
  useEffect(() => {
    setData({
      titulo: "CADASTRO DE PACIENTES",
    });
  }, []);

  const render = () => {
    return (
      <Styled.AreaCadastro>
        <Styled.Title>Preencha os campos para cadastrar</Styled.Title>
        <Styled.AreaPaciente>
          <FormPaciente />
        </Styled.AreaPaciente>
      </Styled.AreaCadastro>
    );
  };
  return render();
};
