import * as Styled from './CardDieta.style';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { UserService } from '../../Service/User.service';

export function CardDieta ({ diet })  {
    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        UserService.Get().then(result => setUsersList(result))
    }, [])
    
    const [filteredUser, setFilteredUser] = useState([]);
    useEffect(() => {
        if (usersList.length > 0) {
            setFilteredUser(usersList.filter(value => value.id === diet?.id_doctor));
        }
    }, [usersList])
    
    return (
        <>
            <Link to={`/dieta?id=${diet.id}`}>
            <Styled.CardContainer>

                <p>Médico: { filteredUser[0]?.name } </p>
                <p>Nome da Dieta: {diet?.diet_name} </p>
                <p>Data da Dieta: {diet?.diet_date} </p>
                <p>Horário da Dieta: {diet?.diet_hour} </p>
                <p>Tipo da Dieta: {diet?.diet_type} </p>
                <p>Descrição: {diet?.diet_description} </p>

            </Styled.CardContainer>
            </Link>
        </>
    );
}