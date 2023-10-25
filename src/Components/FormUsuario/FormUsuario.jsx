import * as Styled from './FormUsuario.style';
import { useEffect, useState } from 'react';


import { useForm } from 'react-hook-form';
import { InputComponent } from '../FormUsuario/InputComponent/InputComponent';
import { UserService } from '../../Service/User.service';
import { Switch, Spin } from 'antd';

import { SelectComponent } from '../SelectComponent/SelectComponent';



export const FormUsuario = () => {

  const genders = [
    {
      id: 1,
      value: 'f',
      label: 'Feminino'
    },

    {
      id: 2,
      value: 'm',
      label: 'Masculino'
    },

    {
      id: 3,
      value: 'o',
      label: 'Outros'
    },

    {
      id: 4,
      value: 'n',
      label: 'Prefiro não responder'
    }
  ];

 
  const tipo = [
    {
      id: 1,
      value: 'A',
      label: 'Administrador(a)'
    },

    {
      id: 2,
      value: 'M',
      label: 'Médico(a)'
    },

    {
      id: 3,
      value: 'E',
      label: 'Enfermeiro(a)'
    },

    {
      id: 4,
      value: 'ou',
      label: 'Outro'
    }
  ];


  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm()



   const createUser = (userData) => {
    UserService.CreateUser(userData)
      .then(response => {
        console.log('Usuário cadastrado com sucesso:', response);
        reset();
      })
      .catch(error => {
        console.error('Erro ao cadastrar usuário:', error);
      });
  };
  

 const deleteUser = (userData) => {
    UserService.DeleteUser(userData.nome)
      .then(response => {
        console.log('Usuário deletado com sucesso:', response);
        reset();
      })
      .catch(error => {
        console.error('Erro ao deletar usuário:', error);
      });
  };



  const submitForm = async (userData) => {


   const usuario = await UserService.CreateUser(userData);

    if (!usuario) {
      alert('Novo Usuário Cadastrado');
      reset();
    
    } else {
      alert('Usuário não cadastrado');
    }

  }


  const [isLoading, setIsLoading] = useState()

  return (
    <Styled.Form onSubmit={handleSubmit(submitForm)}>

      <Styled.Header>
        <Styled.Title>Identificação</Styled.Title>


        <Styled.LabelSwitch>
          Editar
        </Styled.LabelSwitch>

        <Styled.SwitchBtn>
          <Switch/>
        </Styled.SwitchBtn>


        <Styled.ButtonDel $width={'10%'} onClick={deleteUser} $active={!errors.email && !errors.password} type='button' disabled={errors.email || errors.password}>Deletar</Styled.ButtonDel>
       
        <Styled.Button onClick={() => setIsLoading(true)} $width={'10%'} onSubmit={createUser} $active={!errors.email && !errors.password} type='submit' disabled={errors.email || errors.password}>{isLoading ? <Spin/> : 'Salvar'}</Styled.Button>
      </Styled.Header>


      <Styled.MainForm $width={'100%'}>
        <Styled.InputGroup>

          <InputComponent $width={'100%'}
            id='nome'
            type='string'
            placeholder='Digite seu Nome'
            label='Nome Completo'
            name='nome'
            
              register={{
           ...register('nome', {
              required: true,
              minLenght: 8 ,
              maxLenght: 64 ,
          })
            }}
            error={errors.nome}
          />

          <SelectComponent $width={'20%'}
            id='genero'
            name='genero'
            label={'Gênero'}
            options={genders}
            register={{
              ...register('genero', {
                   required: true,
              })
            }}
            error={errors.genero}
          />

         
        </Styled.InputGroup>

        <Styled.InputGroup>

          <InputComponent $width={'100%'}
            id='cpf'
            type='text'
            name='cpf'
            placeholder='Digite seu CPF'
            label='CPF'
              register={{
           ...register('cpf', {
              required: true,

          })
            }}
            error={errors.cpf}
          />

<InputComponent $width={'100%'}
            id='tel'
            type='number'
            placeholder='Telefone'
            name='tel'
            label='Telefone'
              register={{
           ...register('tel', {
              required: true,
             /* required: false, */
          })
            }}
            error={errors.tel}
          />

          <InputComponent $width={'100%'}
            id='email'
            type='email'
            placeholder='Digite o seu email'
            name='email'
            label='E-mail'
              register={{
           ...register('email', {
              required: true,
    
          })
            }}
            error={errors.email}
          />
        

        </Styled.InputGroup>





        <Styled.InputGroup>

  
        <InputComponent $width={'100%'}
            id='password'
            type='password'
            placeholder='Digite a sua senha'
            name='password'
            label='Senha'
              register={{
           ...register('senha', {
              required: true,
          })
            }}
            error={errors.password}
          />

        <SelectComponent $width={'20%'}
            id='tipo'
            name='tipo'
            label={'Tipo'}
            options={tipo}
            register={{
              ...register('tipo', {
                   required: true,
              })
            }}
            error={errors.tipo}
          />
         

</Styled.InputGroup>
      </Styled.MainForm>




    </Styled.Form>
  )
}