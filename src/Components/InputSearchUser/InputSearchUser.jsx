import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Styled from './InputSearchUser.style';
import { UserService } from '../../Service/User.service';
import CardUser from '../CardUser/CardUser';

export const InputSearchUser = () => {
 
    const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const [userEncontrado, setUserEncontrado] = useState(null);

  const submitInputForm = async (dataInput) => {
    const { nome } = dataInput;
    
    const User = await UserService.ShowByNome(nome);
    console.log(user)
    
      if (!User) {
        alert('Usuário não cadastrado');
        setUserEncontrado(null);
        reset();
      } else {
        setUserEncontrado(User);
        reset()
      }
  
  };

  return (
    <>
      <Styled.InputContainer>
        <h2>Informações Rápidas de Usuários</h2>
        <Styled.FormInput onSubmit={handleSubmit(submitInputForm)}>
          <input
            className="input2 inputFaq"
            placeholder="Digite o nome do usuário"
            {...register('nome')}
          />
          <button className="botao" type="submit">
            <span className="material-symbols-outlined">Buscar</span>
          </button>
          <button className="botao" type="submit" >
            <span className="material-symbols-outlined">Gerenciar Usuário</span>
          </button>
        </Styled.FormInput>
      </Styled.InputContainer>

        <Styled.CardRender>
            {userEncontrado && userEncontrado.map(user => <CardUser user={user} key={user.id} />)}
        </Styled.CardRender>
    </>
  );
};