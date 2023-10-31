import * as Styled from './InputSearchMedicalRecord.style';

export const InputSearchMedicalRecord = () => {

    const [searchedTerm, setSearchedTerm] = useState();
    const searchTerm = (value) => {
        if (!searchedTerm) {
            return value; 
        } else if (Number(searchedTerm)) {
            return filterById(value);
        } else {
            return filterByName(value);
        }
    }

    const filterById = (value) => { 
        if(String(value.id).includes(searchedTerm)) { return value }
    }

    const filterByName = (value) => {
        if(value.user.name.toLowerCase().includes(searchedTerm.toLowerCase())) { return value }
    }
    
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
                        onClick={ searchTerm }
                    >
                        Buscar
                    </button>
                </Styled.SearchInput>

            </Styled.InputContainer>
        </>
    )
}