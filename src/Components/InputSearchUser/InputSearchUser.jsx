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

  const submitInputFormADM = async (dataInputUser) => {
    const { nome } = dataInputUser;
    
    const user = await UserService.ShowByName(nome);
    console.log(user)
    
      if (!user) {
        alert('Usuário não cadastrado');
        setUserEncontrado(null);
        reset();
      } else {
        setUserEncontrado(user);
        reset()
      }
  
  };

  return (
    <>
      <Styled.InputContainer>
        <h2>Informações Rápidas de Usuários</h2>
        <Styled.FormInput onSubmit={handleSubmit(submitInputFormADM)}>
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
            {userEncontrado && Object.keys(userEncontrado).map(user => <CardUser user={user} key={user.nome} />)}
        </Styled.CardRender>
    </>
  );
};