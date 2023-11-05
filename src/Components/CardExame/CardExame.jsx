import * as Styled from './CardExame.style';

export function CardExame ({ exam })  {

    return (
        <>
            <Styled.CardContainer>

                <p>Médico: {  } </p>
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