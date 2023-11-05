import * as Styled from './CardConsulta.style';
import { useEffect, useState } from 'react';

import { UserService } from '../../Service/User.service';

export function CardConsulta ({ appointment })  {
    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        UserService.Get().then(result => setUsersList(result))
    }, [])
    
    const [filteredUser, setFilteredUser] = useState([]);
    useEffect(() => {
        if (usersList.length > 0) {
            setFilteredUser(usersList.filter(value => value.id === appointment?.id_doctor));
        }
    }, [usersList])
    
    return (
        <>
            <Styled.CardContainer>

                <p>Médico: { filteredUser[0]?.name } </p>
                <p>Motivo da Consulta: {appointment?.appointment_reason} </p>
                <p>Data da Consulta: {appointment?.appointment_date} </p>
                <p>Horário da Consulta: {appointment?.appointment_hour} </p>
                <p>Descrição do Problema: {appointment?.problem_description} </p>
                <p>Medicação Receitada: {appointment?.medication_prescribed} </p>
                <p>Dosagem e Precauções: {appointment?.dosage_precautions} </p>

            </Styled.CardContainer>
        </>
    );
}