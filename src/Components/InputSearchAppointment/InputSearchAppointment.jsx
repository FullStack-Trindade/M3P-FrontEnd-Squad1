import * as Styled from './InputSearchAppointment.style';
import { useEffect, useState } from 'react';

import { InputComponent } from '../Form/InputComponent/InputComponent';
import { FormAppointment } from '../FormAppointment/FormAppointment';
import { PatientService } from '../../Service/Patient.service';
import { UserService } from '../../Service/User.service';

export const InputSearchAppointment = () => {
    useEffect(() => { 
        fetchPatientsList();
        fetchUsersList();
    }, [])

    const [patientsList, setPatientsList] = useState([]);
    const fetchPatientsList = async() => {
        PatientService.Get().then(result => setPatientsList(result));
    }
    
    const [usersList, setUsersList] = useState([]);
    const fetchUsersList = async() => {
        UserService.Get().then(result => setUsersList(result));
    }

    const [inputName, setInputName] = useState();
    const [patient, setPatient] = useState([]);

    const searchPatient = () => {
        const filteredUser = usersList.filter(user => user.name.includes(inputName));

        if (filteredUser.length === 0) {
            return alert('Paciente não consta no cadastro');
        }

        const filteredPatient = patientsList.filter(patient => String(patient.idUser).includes(String(filteredUser[0].id)));
        setPatient(filteredPatient);
    }

    return (
        <>
            <Styled.InputContainer>

                <h4>Encontre o paciente:</h4>

                <Styled.SearchInput>
                    <InputComponent 
                        $width={'100%'}
                        id='namePatient'
                        type='text'
                        placeholder='Digite o nome do paciente'
                        name='namePatient'
                        onChange={ e => setInputName(e.target.value) }
                    />

                    <button 
                        className="button" 
                        type='submit'
                        onClick={ searchPatient }
                    >
                        Buscar
                    </button>
                </Styled.SearchInput>

                <Styled.PatientArea>
                    <FormAppointment patient={ patient } />
                </Styled.PatientArea>

            </Styled.InputContainer>
        </>
    )
}