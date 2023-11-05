import * as Styled from './CardExame.style';
import { useEffect, useState } from 'react';

import { UserService } from '../../Service/User.service';

export function CardExame ({ exam })  {
    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        UserService.Get().then(result => setUsersList(result))
    }, [])
    
    const [filteredUser, setFilteredUser] = useState([]);
    useEffect(() => {
        if (usersList.length > 0) {
            setFilteredUser(usersList.filter(value => value.id === exam?.id_doctor));
        }
    }, [usersList])
    
    return (
        <>
            <Styled.CardContainer>

                <p>Médico: { filteredUser[0]?.name } </p>
                <p>Nome do Exame: {exam?.nameExam} </p>
                <p>Data do Exame: {exam?.dateExam} </p>
                <p>Horário do Exame: {exam?.hourExam} </p>
                <p>Tipo do Exame: {exam?.typeExam} </p>
                <p>Laboratório: {exam?.labExam} </p>
                <p>URL do Documento: {exam?.urlExam} </p>
                <p>Resultados: {exam?.resultExam} </p>

            </Styled.CardContainer>
        </>
    );
}