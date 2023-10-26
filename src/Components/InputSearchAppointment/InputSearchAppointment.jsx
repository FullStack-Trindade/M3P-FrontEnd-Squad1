import * as Styled from './InputSearchAppointment.style';

import { InputComponent } from '../Form/InputComponent/InputComponent';
import { FormAppointment } from '../FormAppointment/FormAppointment';

export const InputSearchAppointment = () => {
    
    return (
        <>
            <Styled.InputContainer>

                <h4>Encontre o paciente:</h4>

                <Styled.SearchInput>
                    <InputComponent 
                        $width={'100%'}
                        id='namePatient'
                        type='text'
                        placeholder='Digite o nome do paciente'
                        name='namePatient'
                    />

                    <button 
                        className="button" 
                        type='submit'
                    >
                        Buscar
                    </button>
                </Styled.SearchInput>

                <Styled.PatientArea>
                    <FormAppointment patient={ 'patient' } />
                </Styled.PatientArea>

            </Styled.InputContainer>
        </>
    )
}