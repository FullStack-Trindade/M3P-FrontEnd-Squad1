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
                    >
                        Buscar
                    </button>
                </Styled.SearchInput>

                <Styled.PatientArea>
                    <FormAppointment patient={ 'patient' } />
                </Styled.PatientArea>

            </Styled.InputContainer>
        </>
    )
}