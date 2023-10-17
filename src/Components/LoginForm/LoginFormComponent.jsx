import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useContext, useState} from 'react';

import { InputComponent } from '../FormPaciente/InputComponent/InputComponent';
import * as Styled from './LoginFormComponent.style';
import { AuthContext } from '../../Context/auth.context';
import { UserService } from '../../../src/Service/User.service';

import { Spin } from 'antd';

export const FormLoginComponent = () => {


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },  
  } = useForm()

  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext)


/*   const [userLogado, setUserLogado] = useState(null); */

  const submitForm = async (data) => {
    const { email, password } = data;

    const user = await UserService.ShowByEmail(email);  


    if(!user) {
      alert('Usuário não cadastrado');
      reset();
      return;
    }/* else {
      setUserLogado(user.email)
    } */

    password === user.password
      ? redirectToHome(user)
      : alert('Ops! Usuário e/ou Senha Invalidos.');
  }

  const redirectToHome = (user) => {

    setAuth({
      user,
      isLogged: true,
    })
    navigate('/')
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