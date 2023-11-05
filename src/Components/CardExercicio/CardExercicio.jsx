import * as Styled from './CardExercicio.style';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { UserService } from '../../Service/User.service';

export function CardExercicio ({ exercise })  {
    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        UserService.Get().then(result => setUsersList(result))
    }, [])
    
    const [filteredUser, setFilteredUser] = useState([]);
    useEffect(() => {
        if (usersList.length > 0) {
            setFilteredUser(usersList.filter(value => value.id === exercise?.id_nurse));
        }
    }, [usersList])
    
    return (
        <>
            <Link to={`/exercicio?id=${exercise.id}`}>
            <Styled.CardContainer>

                <p>Enfermeiro: { filteredUser[0]?.name } </p>
                <p>Nome da Série de Exercícios: {exercise?.seriesName} </p>
                <p>Data do Exercício: {exercise?.dateExercise} </p>
                <p>Horário do Exercício: {exercise?.hourExercise} </p>
                <p>Tipo do Exercício: {exercise?.typeExercise} </p>
                <p>Quantidade por Semana: {exercise?.amountWeek} </p>
                <p>Descrição: {exercise?.descritionExercise} </p>

            </Styled.CardContainer>
            </Link>
        </>
    );
}