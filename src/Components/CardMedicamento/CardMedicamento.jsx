import * as Styled from './CardMedicamento.style';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { UserService } from '../../Service/User.service';

export function CardMedicamento ({ medication })  {
    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        UserService.Get().then(result => setUsersList(result))
    }, [])
    
    const [filteredUser, setFilteredUser] = useState([]);
    useEffect(() => {
        if (usersList.length > 0) {
            setFilteredUser(usersList.filter(value => value.id === medication?.id_doctor));
        }
    }, [usersList])
    
    return (
        <>
            <Link to={`/medicamento/${medication.id}`}>
            <Styled.CardContainer>

                <p>Médico: { filteredUser[0]?.name } </p>
                <p>Nome do Medicamento: {medication?.nameMedication} </p>
                <p>Data do Medicamento: {medication?.dateMedication} </p>
                <p>Horário do Medicamento: {medication?.hourMedication} </p>
                <p>Tipo do Medicamento: {medication?.typeMedication} </p>
                <p>Quantidade: {medication?.amountMedication} </p>
                <p>Unidade: {medication?.unitMedication} </p>
                <p>Observações: {medication?.observationMedication} </p>

            </Styled.CardContainer>
            </Link>
        </>
    );
}