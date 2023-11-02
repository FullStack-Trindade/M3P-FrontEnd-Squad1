export const FormDiet = ({ patientId }) => {
    return (
        <>
            
            <Styled.Form>

                <Styled.Header>

                    <Styled.Title>
                        {
                            patientName
                            ? `Dieta de ${ patientName }`
                            : 'Formulário de Dieta' 
                        }
                    </Styled.Title>

                    <Styled.LabelSwitch>Editar</Styled.LabelSwitch>

                    <Styled.SwitchBtn>
                        <Switch />
                    </Styled.SwitchBtn>

                    <Styled.ButtonDel 
                        $width={'10%'} 
                        type='button'
                    >
                        Deletar
                    </Styled.ButtonDel>

                    <Styled.Button 
                        $width={'10%'} 
                        $active={ true }
                        type='submit' 
                    >
                        Salvar
                    </Styled.Button>
                </Styled.Header>
            </Styled.Form>

        </>
    )
}