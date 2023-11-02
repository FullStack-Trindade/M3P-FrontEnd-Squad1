import * as Styled from './FormExam.style';
import { useState } from 'react';
/* import { ExameService } from '../../../../src/Service/User/Exame.service'; */
import { ExamService } from '../../Service/Exam.service';
import { useForm } from 'react-hook-form';
/* import { InputComponent } from '../Form/InputComponent/InputComponent'; */
import { InputComponent } from '../FormPaciente/InputComponent/InputComponent';
import { Switch, Spin } from 'antd';


export const FormExam = ({paciente}) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()



  const createExam = (examData) => {
    ExamService.Create(examData)
      .then(response => {
        console.log('Exame cadastrado com sucesso:', response);
        reset();
      })
      .catch(error => {
        console.error('Erro ao cadastrar Exame:', error);
      });
  };


  const deleteExam = (examData) => {
    ExamService.Delete(examData.id)
      .then(response => {
        console.log('Exame deletado com sucesso:', response);
        reset();
      })
      .catch(error => {
        console.error('Erro ao deletar Exame:', error);
      });
  };
  const updateExam = (examData) => {
    ExamService.Update(examData.id)
      .then(response => {
        console.log('Exame deletado com sucesso:', response);
        reset();
      })
      .catch(error => {
        console.error('Erro ao deletar Exame:', error);
      });
  };

  const submitForm = async (examData) => {
    const data = {...examData}
    const exam = await ExamService.Create(data);
    console.log(data);

    if (!exam) {
      alert('Exame não cadastrado');
      reset();
      
    } else {
      alert('Exame Cadastrado');
    }

  }

    const [isLoading, setIsLoading] = useState()

  return (
    <Styled.Form onSubmit={handleSubmit(submitForm)}>

      <Styled.Header>
        <Styled.Title>Exame de {paciente.nome}</Styled.Title>


        <Styled.LabelSwitch>
          Editar
        </Styled.LabelSwitch>

        <Styled.SwitchBtn>
          <Switch /* defaultChecked={menu} onClick={() => setMenu(!menu)} onChange={onChange} */ />
        </Styled.SwitchBtn>


        <Styled.ButtonDel $width={'10%'} $active={!errors.email && !errors.password} type='button' disabled={errors.email || errors.password}>Deletar</Styled.ButtonDel>
        <Styled.Button onClick={() => setIsLoading(true)} $width={'10%'}  $active={!errors.email && !errors.password} type='submit' disabled={errors.email || errors.password}>{isLoading ? <Spin/> : 'Salvar'}</Styled.Button>
      </Styled.Header>


      <Styled.MainForm $width={'100%'}>
        <Styled.InputGroup>

          <InputComponent $width={'350%'}
            id='id_patient'
            type='string'
            placeholder='Identificador do médico'
            label='Id do Paciente'
            name='id_patient'
            register={{
              ...register('id_patient', {
                required: true,
                minLenght: 5 ,
                maxLenght: 50 ,
              })
            }}
            error={errors.id_patient}
          />
          <InputComponent $width={'350%'}
            id='id_doctor'
            type='string'
            placeholder='Identificador do médico'
            label='Id do médico'
            name='id_doctor'
            register={{
              ...register('id_doctor', {
                required: true,
                minLenght: 5 ,
                maxLenght: 50 ,
              })
            }}
            error={errors.id_doctor}
          />
          <InputComponent $width={'350%'}
            id='nameExam'
            type='string'
            placeholder='Nome do Exame'
            label='Nome do Exame'
            name='nameExam'
            register={{
              ...register('nameExam', {
                required: true,
                minLenght: 5 ,
                maxLenght: 50 ,
              })
            }}
            error={errors.nameExam}
          />


          <InputComponent $width={'100%'}
            id='dateExam'
            type='date'
            placeholder='Digite a data'
            label='Data da Exame'
            name='dataExame'
            register={{
              ...register('dateExam', {
                required: true,
              })
            }}
            error={errors.dateExam}
          />

          <InputComponent $width={'100%'}
            id='hourExam'
            type='hour'
            placeholder='Digite o hora do exame'
            label='Hora do exame'
            name='hora'
            register={{
              ...register('hourExam', {
                required: true,
              })
            }}
            error={errors.hourExam}
          />
        </Styled.InputGroup>

        <Styled.InputGroup  >

          <InputComponent
            id='typeExam'
            type='string'
            placeholder='Tipo de Exame'
            name='tipoExame'
            label='Tipo de Exame'
            register={{
              ...register('typeExam', {
                required: true,
                minLenght: 5 ,
                maxLenght: 30 ,
              })
            }}
            error={errors.typeExam}
          />

          <InputComponent 
            id='labExam'
            type='string'
            placeholder='Laboratório'
            name='labExame'
            label='Laboratório'
            register={{
              ...register('labExam', {
                required: true,
                minLenght: 5 ,
                maxLenght: 30 ,
              })
            }}
            error={errors.labExam}
          />

        </Styled.InputGroup>

        <Styled.InputGroup>


          <InputComponent 
            id='urlExam'
            type='url'
            placeholder='URL do Documento do Exame'
            name='urlExame'
            label='URL do Documento do Exame'
            register={{
              ...register('urlExam', {
                required: false,
              })
            }}
            error={errors.urlExam}
          />

        </Styled.InputGroup>

        <Styled.InputGroup>


          <InputComponent $height={'220px'}
            id='resultExam'
            type='textarea'
            placeholder='Resultado do Exame'
            name='resultExam'
            label='Resultado do Exame'
            register={{
              ...register('resultExam', {
                required: true,
                minLenght: 15 ,
                maxLenght: 1000 ,
              })
            }}
            error={errors.resultExam}
          />

        </Styled.InputGroup>
      </Styled.MainForm>
    </Styled.Form>
  )
}