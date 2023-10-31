import * as Styled from './CardMedicalRecord.style';

export const CardMedicalRecord = ({ patient, user }) => {

    return (
        <>
            <Styled.CardContainer>
                <Styled.RenderCard>
                    <Styled.PatientData>
                        <Styled.Data>{patient.id}</Styled.Data>
                        <Styled.Data>{user.name}</Styled.Data>
                        <Styled.Data>{patient.healthInsurance}</Styled.Data>
                    </Styled.PatientData>
                </Styled.RenderCard>
            </Styled.CardContainer>
        </>
    );
};