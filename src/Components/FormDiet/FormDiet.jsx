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

                </Styled.Header>
            </Styled.Form>

        </>
    )
}