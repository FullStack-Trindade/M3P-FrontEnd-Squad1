import * as Styled from './PasswordFormComponent.style';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Spin } from 'antd';

import { InputComponent } from '../FormPaciente/InputComponent/InputComponent';
import { PasswordService } from '../../Service/Password.service';

export const PasswordFormComponent = () => {
    let params = new URL(document.location).searchParams;
    const passwordToken = params.get('token');
    const userId = params.get('id');
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },  
    } = useForm();

    const navigate = useNavigate();

    const submitForm = async (submitData) => {
        const { password, confirmPassword } = submitData;

        if(!confirmPassword || !password) {
            return alert('Campos de senha são obrigatórios.');
        }

        const submitPasswordData = { 
            id_user: userId,
            token: passwordToken, 
            password: password 
        };

        const response = await PasswordService.Update(submitPasswordData);

        switch (response.status) {
            case 200:
                setIsLoading(false);
                return alert('Nova senha cadastrada com sucesso');
            case 400:
            case 500:
                setIsLoading(false);
                reset();
                return alert('E-mail e/ou senha inválido. Por favor, tente novamente.');
        }
    }

    const [isLoading, setIsLoading] = useState(false);

    return(
        <Styled.Form onSubmit={ handleSubmit(submitForm) }>
        
            <Styled.Header>
                <Styled.Title>Recuperar Senha</Styled.Title>
            </Styled.Header>

            <Styled.InputGroup>
                <InputComponent
                    id='password'
                    type='password'
                    placeholder='Digite sua senha'
                    label='Senha'
                    register={{...register('password', { 
                            required: true, 
                            minLength: 8,
                        })
                    }}
                    error={ errors.password }
                />

                <InputComponent
                    id='confirmPassword'
                    type='password'
                    placeholder='Digite sua senha'
                    label='Confirmar Senha'
                    register={{...register('confirmPassword', { 
                            required: true, 
                            minLength: 8,
                        })
                    }}
                    error={ errors.confirmPassword }
                />
            </Styled.InputGroup>

            <Styled.Button
                $active={ !errors.confirmPassword && !errors.password }
                type='submit'
                disabled={ errors.confirmPassword || errors.password }
            > 
                { isLoading ? <Spin/> : 'Enviar' } 
            </Styled.Button>

            <Styled.Action>
                <Styled.LinkLogin 
                    onClick={ () => navigate('/login') }
                >
                    Voltar para Login
                </Styled.LinkLogin>
            </Styled.Action>

        </Styled.Form>
    )
}