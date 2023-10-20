import * as Styled from './FormExame.style';
import { useState } from 'react'

/* import { VacinaService } from '../../../Service/User/Vacina.service'; */

import { useForm } from 'react-hook-form';
import { InputComponent } from '../Form/InputComponent/InputComponent';
import { Switch, Spin } from 'antd';


export const FormExame = ({paciente}) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const submitForm = async (vacinaData) => {
  
    const data = {...exameData, pacienteId: paciente.id}
    const exame = await Exame.CreateExame(data);

    if (!vacina) {
      alert('Exame Cadastrada');
      reset();

    } else {
      alert('Exame não cadastrado');
    }

  }

  const [isLoading, setIsLoading] = useState()

  return (
    <Styled.Form onSubmit={handleSubmit(submitForm)}>

      <Styled.Header>
        <Styled.Title>Vacina de {paciente.nome}</Styled.Title>


        <Styled.LabelSwitch>
          Editar
        </Styled.LabelSwitch>

        <Styled.SwitchBtn>
          <Switch /* defaultChecked={menu} onClick={() => setMenu(!menu)} onChange={onChange} */ />
        </Styled.SwitchBtn>

        <Styled.ButtonDel $width={'10%'} $active={!errors.email && !errors.password} type='button' disabled={errors.email || errors.password} >Deletar</Styled.ButtonDel>
        <Styled.Button onClick={() => setIsLoading(true)}  $width={'10%'} $active={!errors.email && !errors.password} type='submit' disabled={errors.email || errors.password}>{isLoading ? <Spin/> : 'Salvar'}</Styled.Button>
      </Styled.Header>


      <Styled.MainForm $width={'100%'}>
        <Styled.InputGroup>

          <InputComponent $width={'350%'}
            id='nomeExame'
            type='string'
            placeholder='Informe o nome do exame'
            label='Nome do exame'
            name='nomeExame'
            register={{
              ...register('nomeExame', {
                required: true,
                minLenght: 8 ,
                maxLenght: 64 ,
              })
            }}
            error={errors.motivo}
          />
          <InputComponent $width={'350%'}
            id='nomeLaboratorio'
            type='string'
            placeholder='Nome do laboratório'
            label='Nome do laboratório'
            name='nomeLaboratorio'
            register={{
              ...register('nomeLaboratorio', {
                required: true,
                minLenght: 4 ,
                maxLenght: 32 ,
              })
            }}
            error={errors.nomeLaboratorio}
          />

          <InputComponent $width={'100%'}
            id='dataExame'
            type='date'
            placeholder='Digite a data'
            label='Data do exame'
            name='dataExame'
            register={{
              ...register('dataExame', {
                required: true,
              })
            }}
            error={errors.dataExame}
          />

          <InputComponent $width={'100%'}
            id='horaExame'
            type='hour'
            placeholder='Digite o hora do exame'
            label='Hora do exame'
            name='horaExame'
            register={{
              ...register('horaExame', {
                required: true,
              })
            }}
            error={errors.hora}
          />

        </Styled.InputGroup>
        <Styled.InputGroup  >
        <InputComponent $width={'350%'}
            id='tipoExame'
            type='string'
            placeholder='Tipo do exame.'
            name='tipoExame'
            label='Tipo do exame'
            register={{
              ...register('tipoExame', {
                required: false,
                minLenght: 4 ,
                maxLenght: 32 ,
              })
            }}
            error={errors.descProb}
          />

        </Styled.InputGroup>
        <Styled.InputGroup  >
          <InputComponent $height={'100px'}
            id='resultadoExame'
            type='textarea'
            placeholder='Detalhe aqui o resultado do exame.'
            name='resultadoExame'
            label='Resultado do exame'
            register={{
              ...register('resultadoExame', {
                required: false,
                minLenght: 16 ,
                maxLenght: 1024 ,
              })
            }}
            error={errors.descProb}
          />

        </Styled.InputGroup>

      </Styled.MainForm>
    </Styled.Form>
  )
}