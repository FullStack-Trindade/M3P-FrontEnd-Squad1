import * as Styled from './CardMedicamento.style';

export function CardMedicamento ({ medication })  {
    
    return (
        <>
            <Styled.CardContainer>

                <p>Médico: {  } </p>
                <p>Nome do Medicamento: {medication?.nameMedication} </p>
                <p>Data do Medicamento: {medication?.dateMedication} </p>
                <p>Horário do Medicamento: {medication?.hourMedication} </p>
                <p>Tipo do Medicamento: {medication?.typeMedication} </p>
                <p>Quantidade: {medication?.amountMedication} </p>
                <p>Unidade: {medication?.unitMedication} </p>
                <p>Observações: {medication?.observationMedication} </p>

            </Styled.CardContainer>
        </>
    );
}