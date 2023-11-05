import * as Styled from './CardExercicio.style';

export function CardExercicio ({ exercise })  {

    return (
        <>
            <Styled.CardContainer>

                <p>Enfermeiro: {  } </p>
                <p>Nome da Série de Exercícios: {exercise?.seriesName} </p>
                <p>Data do Exercício: {exercise?.dateExercise} </p>
                <p>Horário do Exercício: {exercise?.hourExercise} </p>
                <p>Tipo do Exercício: {exercise?.typeExercise} </p>
                <p>Quantidade por Semana: {exercise?.amountWeek} </p>
                <p>Descrição: {exercise?.descritionExercise} </p>

            </Styled.CardContainer>
        </>
    );
}