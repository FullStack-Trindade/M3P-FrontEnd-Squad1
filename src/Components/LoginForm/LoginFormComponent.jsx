import * as Styled from './LoginFormComponent.style';
import { useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Spin } from 'antd';

import { InputComponent } from '../FormPaciente/InputComponent/InputComponent';
import { AuthContext } from '../../Context/auth.context';
import { LoginService } from '../../Service/Login.service';



export const FormLoginComponent = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },  
    } = useForm();

    const { setIdUser, setTokenUser, setIdType } = useContext(AuthContext)

    const submitForm = async (data) => {

    const { email, password } = data;

    if(!email || !password) {
        return alert('Campos e-mail e senha são obrigatórios.');
    }

        const response =  await LoginService.Authenticate(login);
        const dataLogin = await response.json();

        const {id, name, token, id_type} = dataLogin;
    
        switch (response.status) {
            case 200:
                localStorage.setItem('name', JSON.stringify(name));
                localStorage.setItem('token', JSON.stringify(token));
                setIdUser(id);
                setTokenUser(token);
                setIdType(id_type);
                navigate('/');
                break;
            case 400:
            case 500:
                setIsLoading(false);
                reset();
                return alert('E-mail e/ou senha inválido. Por favor, tente novamente.');
        }
    }

    const [isLoading, setIsLoading] = useState()

  return(
    <Styled.Form onSubmit={ handleSubmit(submitForm) }>
          
      <Styled.Header>
        <Styled.Title>Login</Styled.Title>
      </Styled.Header>

      <Styled.InputGroup>
        <InputComponent
          id='email'
          type='email' 
          placeholder='Digite seu email' 
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

      <Styled.Button onClick={() => setIsLoading(true)} $active={ !errors.email && !errors.password } type='submit' disabled={ errors.email || errors.password } > {isLoading ? <Spin/> : 'Entrar'} </Styled.Button>

      <Styled.Action>
          <Styled.LabelRecuperarSenha onClick={() => alert('Você receberá um e-mail para recuperar a sua senha')}>Esqueceu a senha?</Styled.LabelRecuperarSenha>
      </Styled.Action>
    </Styled.Form>
  )
}