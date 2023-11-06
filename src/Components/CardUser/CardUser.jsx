import * as Styled from "./CardUser.style";
import { ImUser } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { PatientService } from "../../Service/Patient.service";
import { useState } from "react";
import { useEffect } from "react";

const CardUser = ({ user }) => {

const [patientRender, setPatientRender] = useState ();
  
useEffect(()=>{
  setPatient();
},[user])

const navigate = useNavigate();
  
  const setPatient = async () =>{
    PatientService.SearchByUserId(user.id).then((response)=>{
           setPatientRender (response);
    })
  }
 
  return (
    <>
      <Styled.CardUserContainer>
        <Styled.RenderCardUser>
          <Styled.IconCardUser>
            <ImUser />
          </Styled.IconCardUser>
          <Styled.DadosUsuario>
            <Styled.DadosNome>{user.name}</Styled.DadosNome>
            <Styled.Dados>{user.gender}</Styled.Dados>
            <Styled.Dados>{user.cpf}</Styled.Dados>
            <Styled.Dados>{user.phone}</Styled.Dados>
          </Styled.DadosUsuario>


          {patientRender&& <Styled.DadosBtn onClick={() => navigate(`/paciente/${patientRender?.id}`, { replace: true })}>Dados</Styled.DadosBtn>}

        </Styled.RenderCardUser>
      </Styled.CardUserContainer>
    </>
  );
};

export default CardUser;
