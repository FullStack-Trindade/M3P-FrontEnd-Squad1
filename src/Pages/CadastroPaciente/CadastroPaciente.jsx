//import * as Styled from "./CadastroPaciente.style";

import { FormPaciente } from "../../Components/FormPaciente/FormPaciente";

//Importar form de paciente

export const PacientePage = () => {
  const render = () => {
    return (
      <>
        <h1>CADASTRO DE PACIENTES</h1>
        <FormPaciente/>
      </>
    );
  };
  return render();
};
