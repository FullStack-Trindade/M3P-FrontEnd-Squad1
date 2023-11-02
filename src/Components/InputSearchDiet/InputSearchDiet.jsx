import * as Styled from './InputSearchDiet.style';
import { useEffect, useState } from 'react';

import { PatientService } from '../../Service/Patient.service';
import { UserService } from '../../Service/User.service';

export const InputSearchDiet = () => {
    let params = new URL(document.location).searchParams;
    const dietId = params.get('id');

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

    return (
        <>
            <Styled.InputContainer>

                <h4>Encontre o paciente</h4>

                <Styled.SearchInput>
                    <input
                        className='input2 inputFaq'
                        id='namePatient'
                        type='text'
                        placeholder='Digite o nome do paciente'
                        name='namePatient'
                    />

                    <button 
                        className="button" 
                        type='submit'
                    >
                        Buscar
                    </button>
                </Styled.SearchInput>

            </Styled.InputContainer>
        </>
    )
}