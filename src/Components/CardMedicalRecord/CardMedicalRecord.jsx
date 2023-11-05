import * as Styled from './CardMedicalRecord.style';
import { Link } from 'react-router-dom';
import { ImArrowRight2 } from 'react-icons/im';

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
                    <Styled.Arrow>
                        <Link to={`/prontuarios?id=${patient.id}`}>
                            <ImArrowRight2 /> 
                        </Link>
                    </Styled.Arrow>
                </Styled.RenderCard>
            </Styled.CardContainer>
        </>
    );
};