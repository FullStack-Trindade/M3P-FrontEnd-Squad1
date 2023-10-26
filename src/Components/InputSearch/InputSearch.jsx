import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Styled from './InputSearch.style';
import { PacienteService } from '../../../Service/User/Paciente.service';
import CardPaciente from '../CardPaciente/CardPaciente';

export const InputSearch = () => {
 
    const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const [pacienteEncontrado, setPacienteEncontrado] = useState(null);

  const submitInputForm = async (dataInput) => {
    const { nome } = dataInput;
    
    const paciente = await PacienteService.ShowByNome(nome);
    console.log(paciente)
    
      if (!paciente) {
        alert('Usuário não cadastrado');
        setPacienteEncontrado(null);
        reset();
      } else {
        setPacienteEncontrado(paciente);
        reset()
      }
  
  };

  return (
    <>
      <Styled.InputContainer>
        <h2>Informações Rápidas de Pacientes</h2>
        <Styled.FormInput onSubmit={handleSubmit(submitInputForm)}>
          <input
            className="input2 inputFaq"
            placeholder="Digite o nome do paciente"
            {...register('nome')}
          />
          <button className="botao" type="submit">
            <span className="material-symbols-outlined">Buscar</span>
          </button>
        </Styled.FormInput>
      </Styled.InputContainer>

        <Styled.CardRender>
            {pacienteEncontrado && pacienteEncontrado.map(paciente => <CardPaciente paciente={paciente} key={paciente.id} />)}
        </Styled.CardRender>
    </>
  );
};
