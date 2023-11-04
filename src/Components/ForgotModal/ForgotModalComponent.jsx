import * as Styled from './ForgotModalComponent.style';

import { InputComponent } from '../FormPaciente/InputComponent/InputComponent';

export const ForgotModalComponent = ({ setShow }) => {

    return(
        <>
            <Styled.Modal>
                <Styled.ModalContainer>

                    <Styled.ModalTitle>Esqueceu sua senha?</Styled.ModalTitle>

                    <Styled.ModalBody>

                        <Styled.ModalBodyP>
                            Não se preocupe. Insira seu e-mail cadastrado e lhe enviaremos um e-mail com as instruções para recuperar sua senha.
                        </Styled.ModalBodyP>

                        <Styled.ModalForm >
                            <InputComponent $width={ '100%' }
                                id='email'
                                type='email' 
                                placeholder='Digite seu e-mail' 
                                label='E-mail'
                                
                            />
                            <Styled.ModalButton
                                type='submit'
                                
                            >
                                Enviar Código
                            </Styled.ModalButton>
                        </Styled.ModalForm>

                    </Styled.ModalBody>
                </Styled.ModalContainer>
            </Styled.Modal>
        </>
    )
}