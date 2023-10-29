import * as Styled from "./InputSearchExame.style";
import { useState, useEffect } from "react";
import { UserService } from "../../Service/User.service";
import { FormExam } from "../FormExam/FormExam";
import { PatientService } from "../../Service/Patient.service";

export const InputSearchExame = () => {
  
  let params = new URL(document.location).searchParams;
  const appointmentId = params.get("id");
  
  useEffect(() => { 
    fetchPatientsList();
    fetchUsersList();
}, [])

  const [patientsList, setPatientsList] = useState([]);

  const fetchPatientsList = async () => {
    PatientService.Get().then((result) => setPatientsList(result));
  };

  const [usersList, setUsersList] = useState([]);

  const fetchUsersList = async () => {
    UserService.Get().then((result) => setUsersList(result));
  };

  const [inputName, setInputName] = useState();
  const [patient, setPatient] = useState([]);

  const searchPatient = () => {
    const filteredUser = usersList.filter((user) =>
      user.name.includes(inputName)
    );

    if (filteredUser.length > 1) {
      return alert("Digite o nome completo do paciente");
    }

    const filteredPatient = patientsList.filter((patient) =>
      String(patient.idUser).includes(String(filteredUser[0]?.id))
    );

    if (filteredPatient.length === 0) {
      return alert("Paciente não consta no cadastro");
    }

    setPatient(filteredPatient);
  };

  return (
    <>
      <Styled.InputContainer>
        <h4>Encontre o paciente</h4>

        <Styled.SearchInput
        /* onSubmit={ handleSubmit(submitInputForm)} */
        >
          <input
            className="input2  inputFaq"
            id="namePatient"
            type="text"
            placeholder="Digite o nome do paciente"
            onChange={(e) => setInputName(e.target.value)}
          />

          <button className="button" type="submit" onClick={searchPatient}>
            Buscar
          </button>
        </Styled.SearchInput>

        <Styled.PatientArea>
          {(patient.length > 0 || appointmentId) && (
            <FormExam patientId={patient[0]?.id} />
          )}
        </Styled.PatientArea>
      </Styled.InputContainer>
    </>
  );
};
