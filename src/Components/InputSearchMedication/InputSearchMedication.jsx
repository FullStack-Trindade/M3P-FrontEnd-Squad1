import * as Styled from './InputSearchMedication.style';
import { useEffect, useState } from 'react';
import { FormMedication } from '../FormMedication/FormMedication';
import { PatientService } from '../../Service/Patient.service';
import { UserService } from '../../Service/User.service';

// export const InputSearchMedication = ({id}) => {
    
//     const medicationId = id;

//     useEffect(() => { 
//         fetchPatientsList();
//         fetchUsersList();
//     }, [])

//     const [patientsList, setPatientsList] = useState([]);
   
//     const fetchPatientsList = async() => {
//         PatientService.Get().then(result => setPatientsList(result));
//     }
    
//     const [usersList, setUsersList] = useState([]);
//     const fetchUsersList = async() => {
//         UserService.Get().then(result => setUsersList(result));
//     }

//     const [inputName, setInputName] = useState();
//     const [patient, setPatient] = useState([]);

//     const searchPatient = () => {
//         const filteredUser = usersList.filter(user => user.name.includes(inputName));

//         if (filteredUser.length > 1) {
//             return alert('Digite o nome completo do paciente');
//         }
        
//         const filteredPatient = patientsList.filter(patient => String(patient.idUser).includes(String(filteredUser[0]?.id)));
        
//         if (filteredPatient.length === 0) {
//             return alert('Paciente não consta no cadastro');
//         }

//         setPatient(filteredPatient);
//     }

//     return (
//         <>
//             <Styled.InputContainer>

//                 <h4>Encontre o paciente</h4>

//                 <Styled.SearchInput>
//                     <input
//                         className='input2 inputFaq'
//                         id='namePatient'
//                         type='text'
//                         placeholder='Digite o nome do paciente'
//                         name='namePatient'
//                         onChange={ e => setInputName(e.target.value) }
//                     />

//                     <button 
//                         className="button" 
//                         type='submit'
//                         onClick={ searchPatient }
//                     >
//                         Buscar
//                     </button>
//                 </Styled.SearchInput>

//                 <Styled.PatientArea>
//                 <FormMedication id ={id}/>
//                     {/* (patient.length > 0 || medicationId) && <FormMedication patientId={ patient[0]?.id } />*/ }
//                 </Styled.PatientArea>

//             </Styled.InputContainer>
//         </>
//     )
// }

export const InputSearchMedication = ({ id }) => {
    
    const [idPatient, setIdPatient] = useState(null);
    const [medicationId, setMedicationId] = useState(id);
    const [patientsList, setPatientsList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [inputName, setInputName] = useState('');
  
    useEffect(() => {
      fetchPatientsList();
      fetchUsersList();
    }, []);
  
    const fetchPatientsList = async () => {
      PatientService.Get().then((result) => setPatientsList(result));
    };
  
    const fetchUsersList = async () => {
      UserService.Get().then((result) => setUsersList(result));
    };
  
    const searchPatient = () => {
      const filteredUser = usersList.filter((user) => user.name.includes(inputName));
  
      if (filteredUser.length > 1) {
        return alert('Digite o nome completo do paciente');
      }
  
      const filteredPatient = patientsList.find((patient) =>
        String(patient.idUser).includes(String(filteredUser[0]?.id))
      );
  
      if (!filteredPatient) {
        return alert('Paciente não consta no cadastro');
      }
  
      setIdPatient(filteredPatient.id);
      setMedicationId(null); // Limpa o ID do medicamento se houver algum.
    };
  
    return (
      <>
      <Styled.InputContainer>
  <Styled.PatientArea>
    {medicationId ? (
      <FormMedication id={medicationId} />
    ) : (
      <div>
        <Styled.SearchInput>
          <h4>Encontre o paciente</h4>
          <input
            className="input2 inputFaq"
            id="namePatient"
            type="text"
            placeholder="Digite o nome do paciente"
            name="namePatient"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <button className="button" type="submit" onClick={searchPatient}>
            Buscar
          </button>
        </Styled.SearchInput>
        <Styled.PatientArea>
          {idPatient && <FormMedication idPatient={idPatient} />}
        </Styled.PatientArea>
      </div>
    )}
  </Styled.PatientArea>
</Styled.InputContainer>

      </>
    );
  }