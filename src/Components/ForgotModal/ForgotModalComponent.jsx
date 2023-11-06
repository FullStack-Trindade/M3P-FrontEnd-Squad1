import * as Styled from './ForgotModalComponent.style';
import { useForm } from 'react-hook-form';

import { InputComponent } from '../FormPaciente/InputComponent/InputComponent';
import { PasswordService } from '../../Service/Password.service';

export const ForgotModalComponent = ({ setShow }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },  
    } = useForm();

    const submitForm = async (dataForm) => {
        const { email } = dataForm;

        if(!email) {
            return alert('E-mail é obrigatório.');
        }

        const response = await PasswordService.CreateToken({ email: email });
        const data = await response.json();

        if (!data) {
            setShow(false);
            return alert(data.message);
        }

        setShow(false);
        return alert(`Sucesso! ${ data.message }`);
    }

    return(
        <>
            <Styled.Modal>
                <Styled.ModalContainer>

                    <Styled.ModalTitle>Esqueceu sua senha?</Styled.ModalTitle>

                    <Styled.ModalBody>

                        <Styled.ModalBodyP>
                            Não se preocupe. Insira seu e-mail cadastrado e lhe enviaremos um e-mail com as instruções para recuperar sua senha.
                        </Styled.ModalBodyP>

                        <Styled.ModalForm onSubmit={ handleSubmit(submitForm) }>
                            <InputComponent $width={ '100%' }
                                id='email'
                                type='email' 
                                placeholder='Digite seu e-mail' 
                                label='E-mail'
                                register={{...register('email', {
                                        required: true, 
                                        validate: { matchPath: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) }
                                    })
                                }}
                                error={ errors.email }
                            />
                            <Styled.ModalButton
                                type='submit'
                                $active={ !errors.email } 
                                disabled={ errors.email }
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