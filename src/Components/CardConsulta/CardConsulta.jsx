import * as Styled from './CardConsulta.style';

export function CardConsulta ({ appointment })  {

    return (
        <>
            <Styled.CardContainer>

                <p>Médico: { } </p>
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