import * as Styled from './InputSearchExame.style';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {UserService} from '../../Service/User.service'
import  {FormExam}  from '../FormExam/FormExam'; 
import {PacienteService} from '../../Service/Paciente.service';


export const InputSearchExame = () => {

   /*  const {
        register,
        handleSubmit,
        reset,
        formState: { error },
      } = useForm() */
    
      const [listPatients, setListPatients] = useState([]);
      const [inputName, setInputName] = useState();
      const [listUsers, setListUsers] = useState([]);

      const fetchListPatients = async () => {
        PacienteService.GetAll().then(result => setListPatients(result))
      } 
      const fetchListUsers = async () => {
        UserService.Get().then(result => setListUsers(result))
      }

      useEffect(()=>{
        fetchListPatients(),
        fetchListUsers()
      },[])

      const [patientEncontrado, setPatientEncontrado] = useState([]);
      const searchPatients = () => {
        const filterUser = listUsers.filter(user=>user.name.includes(inputName))
        const filterPatients = listPatients.filter(patients=>String(patients.idUser).includes(String(filterUser[0]?.id)))
        setPatientEncontrado(filterPatients)
      }
  /*    console.log(pacienteEncontrado); */



   
/*     const submitInputForm = async (dataInput) => {
        const {nome} = dataInput;
        console.log(nome);

        const paciente = await PacienteService.ShowByEmail(nome);
        console.log(paciente)

           if(!paciente) {
            alert('Usuário não cadastrado');
            setPacienteEncontrado(null);
            reset();
          } else {  
            setPacienteEncontrado(paciente);
            reset()
          }
    } */
  
    return (
      <>
          <Styled.InputContainer>

          <h4>Encontre o paciente</h4>
              <Styled.FormInput 
              /* onSubmit={ handleSubmit(submitInputForm)} */>
              
              <input className="input2  inputFaq" placeholder="Digite o E-mail do paciente" onChange={e=>setInputName(e.target.value)}/>

              <button onClick={searchPatients} className="botao" type='submit'><span className="material-symbols-outlined">
                  Buscar</span></button>
              </Styled.FormInput>

                <Styled.AreaPaciente>
                  
          {patientEncontrado.length>0 && (
            <FormExam patient={patientEncontrado} />
            )}
                </Styled.AreaPaciente>
            </Styled.InputContainer>
   
         
      </>
  )
};