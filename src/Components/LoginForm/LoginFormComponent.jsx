import * as Styled from './LoginFormComponent.style';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Spin } from 'antd';

import { InputComponent } from '../FormPaciente/InputComponent/InputComponent';
import { ForgotModalComponent } from '../ForgotModal/ForgotModalComponent';
import { LoginService } from '../../Service/Login.service';
import { AuthService } from '../../Service/Auth.service';

export const FormLoginComponent = ({ showLoader }) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },  
    } = useForm();

    const submitForm = async (submitData) => {
        const { email, password } = submitData;

        if(!email || !password) {
            return alert('Campos e-mail e senha são obrigatórios.');
        }

        const submitLoginData = { email: email, password: password };

        const response = await LoginService.Authenticate(submitLoginData);
        const data = await response.json();

        const { id, name, token, id_type } = data;
        
        switch (response.status) {
            case 200:
                localStorage.setItem('name', JSON.stringify(name));
                localStorage.setItem('token', JSON.stringify(token));
                AuthService.Create({
                    id_user: id,
                    token_user: token,
                    id_type: id_type
                })
                navigate('/');
                break;
            case 400:
            case 500:
                setIsLoading(false);
                reset();
                return alert('E-mail e/ou senha inválido. Por favor, tente novamente.');
        }
    }

    const [show, setShow] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    return(
        <>
        <Styled.Form onSubmit={ handleSubmit(submitForm) }>
        
            <Styled.Header>
                <Styled.Title>Login</Styled.Title>
            </Styled.Header>

            <Styled.InputGroup>
                <InputComponent
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
            </Styled.InputGroup>

            <Styled.Button 
                onClick={showLoader} 
                $active={ !errors.email && !errors.password } 
                type='submit' 
                disabled={ errors.email || errors.password } 
            > 
                { isLoading ? <Spin/> : 'Entrar' } 
            </Styled.Button>

            <Styled.Action>
                <Styled.LabelRecuperarSenha 
                    onClick={ () => setShow(true) }
                >
                    Esqueceu a senha?
                </Styled.LabelRecuperarSenha>
            </Styled.Action>
        </Styled.Form>
        {show && <ForgotModalComponent setShow={ setShow } />}
        </>
    )
}