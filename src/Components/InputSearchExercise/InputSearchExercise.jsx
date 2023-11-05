import React, { useState, useEffect } from 'react';
import * as Styled from './InputSearchExam.style.jsx';
import {UserService} from '../../Service/User.service.jsx'
import  {FormExam}  from '../FormExam/FormExam.jsx'; 
import {PatientService} from '../../Service/Patient.service.jsx';


export const InputSearchExercise = () => {

  let params = new URL(document.location).searchParams;
  const exerciseId = params.get('id');

        useEffect(() => {
        fetchPatientsList();
        fetchUsersList();
      }, [])

      const [patientsList, setPatientsList] = useState([]);

      const fetchPatientsList = async () => {
        PatientService.GetAll().then((result) => setPatientsList(result));
      };
    
      const [usersList, setUsersList] = useState([]);
      const fetchUsersList = async () => {
        UserService.Get().then((result) => setUsersList(result));
      };

    const [inputName, setInputName] = useState();
    const [patient, setPatient] = useState([]);

    const searchPatient = () => {
        const filteredUser = usersList.filter(user => user.name.includes(inputName));

        if (filteredUser.length > 1) {
            return alert('Digite o nome completo do paciente');
        }
        
        const filteredPatient = patientsList.filter(patient => String(patient.idUser).includes(String(filteredUser[0]?.id)));
        
        if (filteredPatient.length === 0) {
            return alert('Paciente não consta no cadastro');
        }

        setPatient(filteredPatient);
    }
    return (
      <>
          <Styled.InputContainer>

          <h4>Encontre o paciente</h4>
              <Styled.SearchInput>
              
              <input className="input2  inputFaq" placeholder="Digite o E-mail do paciente" onChange={e=>setInputName(e.target.value)}/>

              <button onClick={searchPatient} className="botao" type='submit'><span className="material-symbols-outlined">
                  Buscar</span></button>
              </Styled.SearchInput>

                <Styled.AreaPaciente>
                  
          {(patient.length>0 || exerciseId )&& (
            <FormExam patientId={patient[0]?.id} />
            )}
                </Styled.AreaPaciente>
            </Styled.InputContainer>
   
         
      </>
  )
 
};