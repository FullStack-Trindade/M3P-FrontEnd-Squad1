import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Styled from './InputSearchProntuario.style';
/* import { PacienteService } from '../../../Service/User/Paciente.service';
import CardProntuario from './../CardProntuario/CardProntuario'; */



export const InputSearchProntuario = () => {

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

            <h4>Utilize a barra de pesquisa para buscar</h4>
                <Styled.FormInput 
                onSubmit={ handleSubmit(submitInputForm)}>
                
                <input className="input2  inputFaq" placeholder="Digite o nome do paciente" {...register('nome')}/>

                <button className="botao" type='submit'><span className="material-symbols-outlined">
                    Buscar</span></button>
                </Styled.FormInput>
           
            <Styled.AreaPaciente/>
            {pacienteEncontrado && pacienteEncontrado.map(paciente => <CardProntuario paciente={paciente} key={paciente.id} />)}

              </Styled.InputContainer>
        </>
    )
}