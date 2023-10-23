import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Styled from './InputSearchExame.style';
import { PacienteService } from '../../Service/Paciente.service';
import  {FormExame}  from '../FormExame/FormExame.jsx'; 


export const InputSearchExame = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { error },
      } = useForm()
    

    const [pacienteEncontrado, setPacienteEncontrado] = useState(null);

   
    const submitInputForm = async (dataInput) => {
        const {nome} = dataInput;

        const paciente = await PacienteService.ShowByNome(nome);
        console.log(paciente.nome)
        
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

            <h4>Encontre o paciente</h4>
                <Styled.FormInput 
                onSubmit={ handleSubmit(submitInputForm)}>
                
                <input className="input2  inputFaq" placeholder="Digite o nome do paciente" {...register('nome')}/>

                <button className="botao" type='submit'><span className="material-symbols-outlined">
                    Buscar</span></button>
                </Styled.FormInput>
           
            <Styled.AreaPaciente>
            {pacienteEncontrado && pacienteEncontrado.map(paciente => <FormExame paciente={paciente} key={paciente.id} />)}
            </Styled.AreaPaciente>
              </Styled.InputContainer>
        </>
    )
}
