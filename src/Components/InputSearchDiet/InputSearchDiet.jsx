import * as Styled from './InputSearchDiet.style';

export const InputSearchDiet = () => {
    return (
        <>
            <Styled.InputContainer>

                <h4>Encontre o paciente</h4>

                <Styled.SearchInput>
                    <input
                        className='input2 inputFaq'
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

            </Styled.InputContainer>
        </>
    )
}