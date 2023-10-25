import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Styled from './InputSearchExame.style';
/* import { PacienteService } from '../../Service/Paciente.service.jsx'; */
import {UserService} from '../../Service/User.service'
import  {FormExame}  from '../FormExame/FormExame.jsx'; 


export const InputSearchExame = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { error },
      } = useForm()
    

    const [pacienteEncontrado, setPacienteEncontrado] = useState([]);

   
    const submitInputForm = async (dataInput) => {
        const {nome} = dataInput;
        console.log(nome);
        const listaUsuarios = await UserService.Get()
        console.log(listaUsuarios);
      const paciente = listaUsuarios.filter(usuario => usuario.name.includes(nome))
      console.log(paciente);

        
        
          if (!listaUsuarios) {
            alert('Usuário não cadastrado');
            setPacienteEncontrado(null);
            reset();
          } else {
            reset()
          } 
          setPacienteEncontrado(paciente[0]);
          console.log(pacienteEncontrado);
      
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
            
          {/*   {pacienteEncontrado && Object.keys(pacienteEncontrado).map(paciente => <FormExame paciente={paciente} key={paciente.id} />)} */}
            </Styled.AreaPaciente>
              </Styled.InputContainer>
        </>
    )
}
