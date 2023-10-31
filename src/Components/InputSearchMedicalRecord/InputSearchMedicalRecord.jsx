import * as Styled from './InputSearchMedicalRecord.style';

export const InputSearchMedicalRecord = () => {

    return (
        <>
            <Styled.InputContainer>

                <h4>Encontre o paciente</h4>

                <Styled.SearchInput>
                    <input
                        className='input2 inputFaq'
                        id='infoPatient'
                        type='text'
                        placeholder='Digite o código ou nome do paciente'
                        name='infoPatient'
                    />
                    
                    <button 
                        className="button" 
                        type='submit'
                    >
                        Buscar
                    </button>
                </Styled.SearchInput>

            </Styled.InputContainer>
        </>
    )
}