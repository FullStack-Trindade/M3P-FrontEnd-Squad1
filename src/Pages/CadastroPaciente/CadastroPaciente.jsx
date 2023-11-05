import * as Styled from "./CadastroPaciente.style";
import { useContext, useEffect } from "react";
import { HeaderContext } from "../../Context/Header.context";

import { FormPaciente } from "../../Components/FormPaciente/FormPaciente";
import { InputSearch } from "../../Components/InputSearchPaciente/InputSearchPaciente";
import { useParams } from "react-router";

export const PacientePage = () => {
  const { setData } = useContext(HeaderContext);
  const {id}= useParams();
  
  useEffect(() => { 
    setData({
      titulo: "CADASTRO DE PACIENTES",
      
    });

  }, []);

  const render = () => {
    return (
      <Styled.AreaCadastro>
        <Styled.Title>Preencha os campos abaixo para cadastrar um paciente</Styled.Title>
        <Styled.AreaPaciente>
          <FormPaciente id={id}/>
        </Styled.AreaPaciente>
      </Styled.AreaCadastro>
    );
  };
  return render();
};
