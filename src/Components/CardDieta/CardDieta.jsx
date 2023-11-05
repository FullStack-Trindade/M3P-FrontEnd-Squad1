import * as Styled from './CardDieta.style';

export function CardDieta ({ diet })  {

    return (
        <>
            <Styled.CardContainer>

                <p>Médico: {  } </p>
                <p>Nome da Dieta: {diet?.diet_name} </p>
                <p>Data da Dieta: {diet?.diet_date} </p>
                <p>Horário da Dieta: {diet?.diet_hour} </p>
                <p>Tipo da Dieta: {diet?.diet_type} </p>
                <p>Descrição: {diet?.diet_description} </p>

            </Styled.CardContainer>
        </>
    );
}