import * as Styled from './FormExame.style';
import { useState } from 'react';
/* import { ExameService } from '../../../../src/Service/User/Exame.service'; */
import { ExameService } from '../../Service/Exame.service';
import { useForm } from 'react-hook-form';
/* import { InputComponent } from '../Form/InputComponent/InputComponent'; */
import { InputComponent } from '../FormPaciente/InputComponent/InputComponent';
import { Switch, Spin } from 'antd';


export const FormExame = ({paciente}) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()



  const createExame = (exameData) => {
    ExameService.CreateExame(exameData)
      .then(response => {
        console.log('Exame cadastrado com sucesso:', response);
        reset();
      })
      .catch(error => {
        console.error('Erro ao cadastrar Exame:', error);
      });
  };


  const deleteExame = (exameData) => {
    ExameService.DeleteExame(exameData.id)
      .then(response => {
        console.log('Exame deletado com sucesso:', response);
        reset();
      })
      .catch(error => {
        console.error('Erro ao deletar Exame:', error);
      });
  };

  const submitForm = async (exameData) => {
    const data = {...exameData, pacienteId: paciente.id}
    const exame = await ExameService.CreateExame(data);

    if (!exame) {
      alert('Exame Cadastrado');
      reset();

    } else {
      alert('Exame não cadastrado');
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
            id='exameNome'
            type='string'
            placeholder='Nome do Exame'
            label='Nome do Exame'
            name='exameNome'
            register={{
              ...register('exameNome', {
                required: true,
                minLenght: 5 ,
                maxLenght: 50 ,
              })
            }}
            error={errors.exameNome}
          />


          <InputComponent $width={'100%'}
            id='dataExame'
            type='date'
            placeholder='Digite a data'
            label='Data da Exame'
            name='dataExame'
            register={{
              ...register('dataExame', {
                required: true,
              })
            }}
            error={errors.dataExame}
          />

          <InputComponent $width={'100%'}
            id='hora'
            type='hour'
            placeholder='Digite o hora do exame'
            label='Hora do exame'
            name='hora'
            register={{
              ...register('hora', {
                required: true,
              })
            }}
            error={errors.nome}
          />
        </Styled.InputGroup>

        <Styled.InputGroup  >

          <InputComponent
            id='tipoExame'
            type='string'
            placeholder='Tipo de Exame'
            name='tipoExame'
            label='Tipo de Exame'
            register={{
              ...register('tipoExame', {
                required: true,
                minLenght: 5 ,
                maxLenght: 30 ,
              })
            }}
            error={errors.tipoExame}
          />

          <InputComponent 
            id='labExame'
            type='string'
            placeholder='Laboratório'
            name='labExame'
            label='Laboratório'
            register={{
              ...register('labExame', {
                required: true,
                minLenght: 5 ,
                maxLenght: 30 ,
              })
            }}
            error={errors.labExame}
          />

        </Styled.InputGroup>

        <Styled.InputGroup>


          <InputComponent 
            id='urlExame'
            type='url'
            placeholder='URL do Documento do Exame'
            name='urlExame'
            label='URL do Documento do Exame'
            register={{
              ...register('urlExame', {
                required: false,
              })
            }}
            error={errors.urlExame}
          />

        </Styled.InputGroup>

        <Styled.InputGroup>


          <InputComponent $height={'220px'}
            id='resultadoExame'
            type='textarea'
            placeholder='Resultado do Exame'
            name='resultadoExame'
            label='Resultado do Exame'
            register={{
              ...register('resultadoExame', {
                required: true,
                minLenght: 15 ,
                maxLenght: 1000 ,
              })
            }}
            error={errors.resultadoExame}
          />

        </Styled.InputGroup>
      </Styled.MainForm>
    </Styled.Form>
  )
}