import * as Styled from './FormAppointmet.style';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { message, Switch } from 'antd';

import { AppointmentService } from '../../Service/Appointment.service';
import { UserService } from '../../Service/User.service';

import { InputComponent } from '../Form/InputComponent/InputComponent';

export const FormAppointment = () => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  const [messageApi, contextHolder] = message.useMessage();

  let params = new URL(document.location).searchParams;
  const appointmentId = params.get('id');

  useEffect(() => { 
    reset();
    fetchAppointmentsList();
    fetchUsersList();
  }, [])

  const [appointmentsList, setAppointmentsList] = useState([]);
  const fetchAppointmentsList = async() => {
    AppointmentService.Get().then(result => setAppointmentsList(result));
  }

  const [usersList, setUsersList] = useState([]);
  const fetchUsersList = async() => {
    UserService.Get().then(result => setUsersList(result));
  }

  useEffect(() => {
    if (appointmentId !== null) { filterAppointment() }
  }, [appointmentsList]);

  const [appointment, setAppointment] = useState([]);
  const filterAppointment = () => {
    const filteredAppointment = appointmentsList.filter(appointment => String(appointment.id).includes(appointmentId));
    setAppointment(filteredAppointment);
  }

  useEffect(() => {
    if(appointment.length > 0) {
      setValue('idPatient', appointment[0].id_patient);
      setValue('idDoctor', appointment[0].id_doctor);
      setValue('appointmentDate', appointment[0].appointment_date);
      setValue('appointmentHour', appointment[0].appointment_hour);
      setValue('problemDescription', appointment[0].problem_description);
      setValue('appointmentReason', appointment[0].appointment_reason);
      setValue('medicationPrescribed', appointment[0].medication_prescribed);
      setValue('dosagePrecautions', appointment[0].dosage_precautions);
    }
  }, [appointment])
  
  const inputPatientId = watch('idPatient');
  useEffect(() => { onChangePatient(inputPatientId) }, [inputPatientId]);

  const [patientName, setPatientName] = useState();
  const onChangePatient = (value) => {
    const idPatient = value;

    if (idPatient > 0) {
      const dataPatient = usersList.filter(user => String(user.id).includes(idPatient));
      setPatientName(dataPatient[0]?.name);
      setValue('patientName', dataPatient[0]?.name);
    }
  }

  const inputDoctorId = watch('idDoctor');
  useEffect(() => { onChangeDoctor(inputDoctorId) }, [inputDoctorId]);
  
  const onChangeDoctor = (value) => {
    const idDoctor = value;

    if (idDoctor > 0) {
      const dataDoctor = usersList.filter(user => String(user.id).includes(idDoctor));
      setValue('doctorName', dataDoctor[0]?.name);
    }
  }

  const onSubmitForm = async(dataForm) => {
    const data = {
      id_patient: dataForm.idPatient,
      id_doctor: dataForm.idDoctor,
      appointment_date: dataForm.appointmentDate,
      appointment_hour: dataForm.appointmentHour,
      problem_description: dataForm.problemDescription,
      appointment_reason: dataForm.appointmentReason,
      medication_prescribed: dataForm.medicationPrescribed,
      dosage_precautions: dataForm.dosagePrecautions,
      status: true
    }

    onSave(data);
  }

  const onSave = async(submitData) => {

    await AppointmentService.Create(submitData)
      .then((response) => { 
        switch (response.status) {
          case 201:
            reset();
            return messageApi.open({ type: 'success', content: 'Sucesso! Consulta cadastrada.' });
          case 400:
            reset();
            return messageApi.open({ type: 'error', content: `Erro no cadastro! Por favor, tente novamente.` });
          case 500:
            reset();
            return messageApi.open({ type: 'error', content: `Erro no cadastro! Por favor, tente novamente.` });
        }
      })
      .catch((error) => {
        messageApi.open({ type: 'error', content: 'Erro no cadastro. Por favor, tente novamente.' });
        console.error('Erro ao cadastrar consulta:', error);
        reset();
      });
  };

  return (
    <>

      { contextHolder }

      <Styled.Form onSubmit={ handleSubmit(onSubmitForm) }>

        <Styled.Header>

          { appointmentId && patientName
            ? <Styled.Title>Consulta de { patientName }</Styled.Title> 
            : <Styled.Title>Formulário de Consulta</Styled.Title> 
          }

          <Styled.LabelSwitch>Editar</Styled.LabelSwitch>

          <Styled.SwitchBtn>
            <Switch 
              // defaultChecked={  }
              // disabled={  }
              // onClick={  } 
              // onChange={  }
            />
          </Styled.SwitchBtn>

          <Styled.ButtonDel 
            $width={'10%'} 
            // $active={  } 
            type='button' 
            // disabled={  } 
            // onClick={  }
          >
            Deletar
          </Styled.ButtonDel>

          <Styled.Button 
            $width={'10%'} 
            $active={ true }
            type='submit' 
          >
            Salvar
          </Styled.Button>
        </Styled.Header>

        <Styled.Paragraph>* Campos obrigatórios</Styled.Paragraph>

        <Styled.MainForm $width={'100%'}>

          <Styled.InputGroup>
            <InputComponent $width={'100%'}
              id='idPatient'
              type='number'
              placeholder='Digite o código'
              label='Código do Paciente*'
              name='idPatient'
              min={ 1 }
              // disabled={  }
              register={{
                ...register('idPatient', {
                  required: true,
                })
              }}
              error={ errors.idPatient }
            />

            <InputComponent $width={'350%'}
              id='patientName'
              type='string'
              placeholder='Nome do paciente'
              label='Nome do Paciente'
              name='patientName'
              disabled={ true }
              register={{
                ...register('patientName', {
                  required: false
                })
              }}
              error={ errors.patientName }
            />
          </Styled.InputGroup>
          
          <Styled.InputGroup>
            <InputComponent $width={'100%'}
              id='idDoctor'
              type='number'
              placeholder='Digite o código'
              label='Código do Médico(a)*'
              name='idDoctor'
              min={ 1 }
              // disabled={  }
              register={{
                ...register('idDoctor', {
                  required: true,
                })
              }}
              error={ errors.idDoctor }
            />
            
            <InputComponent $width={'350%'}
              id='doctorName'
              type='string'
              placeholder='Nome do médico(a)'
              label='Nome do médico(a)'
              name='doctorName'
              disabled={ true }
              register={{
                ...register('doctorName', {
                  required: false
                })
              }}
              error={ errors.doctorName }
            />
          </Styled.InputGroup>

          <Styled.InputGroup>
            <InputComponent $width={'350%'}
              id='appointmentReason'
              type='string'
              placeholder='Digite o motivo da consulta'
              label='Motivo da Consulta*'
              name='appointmentReason'
              // disabled={  }
              register={{
                ...register('appointmentReason', {
                  required: true,
                  minLength: 8 ,
                  maxLength: 64 ,
                })
              }}
              error={ errors.appointmentReason }
            />

            <InputComponent $width={'100%'}
              id='appointmentDate'
              type='date'
              placeholder='Digite a data da consulta'
              label='Data da Consulta*'
              name='appointmentDate'
              // disabled={  }
              register={{
                ...register('appointmentDate', {
                  required: true,
                })
              }}
              error={ errors.appointmentDate }
            />

            <InputComponent $width={'100%'}
              id='appointmentHour'
              type='time'
              placeholder='Digite o hora da consulta'
              label='Hora da Consulta*'
              name='appointmentHour'
              // disabled={  }
              register={{
                ...register('appointmentHour', {
                  required: true,
                })
              }}
              error={ errors.appointmentHour }
            />
          </Styled.InputGroup>

          <Styled.InputGroup>
            <InputComponent $height={'100px'}
              id='problemDescription'
              type='textarea'
              placeholder='Descreva o problema'
              name='problemDescription'
              label='Descrição do Problema*'
              // disabled={  }
              register={{
                ...register('problemDescription', {
                  required: true,
                  minLength: 16 ,
                  maxLength: 1024 ,
                })
              }}
              error={ errors.problemDescription }
            />
          </Styled.InputGroup>

          <Styled.InputGroup>
            <InputComponent $height={'70px'}
              id='medicationPrescribed'
              type='textarea'
              placeholder='Medicação Receitada'
              name='medicationPrescribed'
              label='Medicação Receitada'
              // disabled={  }
              register={{
                ...register('medicationPrescribed', {
                  required: false,
                })
              }}
              error={ errors.medicationPrescribed }
            />
          </Styled.InputGroup>

          <Styled.InputGroup>
            <InputComponent $height={'70px'}
              id='dosagePrecautions'
              type='textarea'
              placeholder='Dosagem e Precauções'
              name='dosagePrecautions'
              label='Dosagem e Precauções*'
              // disabled={  }
              register={{
                ...register('dosagePrecautions', {
                  required: true,
                  minLength: 16 ,
                  maxLength: 256 ,
                })
              }}
              error={ errors.dosagePrecautions }
            />
          </Styled.InputGroup>
        </Styled.MainForm>
      </Styled.Form>
    </>
  )
}