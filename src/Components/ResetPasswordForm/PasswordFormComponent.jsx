import * as Styled from './PasswordFormComponent.style';

import { InputComponent } from '../FormPaciente/InputComponent/InputComponent';

export const PasswordFormComponent = () => {

    return(
        <Styled.Form >
        
            <Styled.Header>
                <Styled.Title>Recuperar Senha</Styled.Title>
            </Styled.Header>

            <Styled.InputGroup>
                <InputComponent
                    id='password'
                    type='password'
                    placeholder='Digite sua senha'
                    label='Senha'
                />

                <InputComponent
                    id='confirmPassword'
                    type='password'
                    placeholder='Digite sua senha'
                    label='Confirmar Senha'
                />
            </Styled.InputGroup>

            <Styled.Button 
                type='submit' 
            > 
                'Enviar' 
            </Styled.Button>

            <Styled.Action>
                <Styled.LinkLogin 
                >
                    Voltar para Login
                </Styled.LinkLogin>
            </Styled.Action>

        </Styled.Form>
    )
}