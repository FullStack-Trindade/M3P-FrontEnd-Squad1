import * as Styled from './InputSearchMedicalRecord.style';

export const InputSearchMedicalRecord = () => {

    const [searchedTerm, setSearchedTerm] = useState();

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
                        onChange={ e => setSearchedTerm(e.target.value) }
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