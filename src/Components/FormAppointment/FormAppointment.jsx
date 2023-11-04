import * as Styled from './FormAppointmet.style';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Switch } from 'antd';

import { AppointmentService } from '../../Service/Appointment.service';
import { PatientService } from '../../Service/Patient.service';
import { UserService } from '../../Service/User.service';

import { InputComponent } from '../Form/InputComponent/InputComponent';

export const FormAppointment = ({ patientId }) => {
  
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  let params = new URL(document.location).searchParams;
  const appointmentId = params.get('id');

  useEffect(() => { 
    reset();
    fetchAppointmentsList();
    fetchPatientsList();
    fetchUsersList();
  }, [])

  const [appointmentsList, setAppointmentsList] = useState([]);
  const fetchAppointmentsList = async() => {
    AppointmentService.Get().then(result => setAppointmentsList(result));
  }

  const [patientsList, setPatientsList] = useState([]);
  
  const fetchPatientsList = async() => {
    PatientService.Get().then(result => setPatientsList(result));
  }

  const [usersList, setUsersList] = useState([]);
  const fetchUsersList = async() => {
    UserService.Get().then(result => setUsersList(result));
  }
  
  useEffect(() => { setValue('idPatient', patientId) }, [patientId])

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
  const patientName = watch('patientName');
  useEffect(() => { onChangePatient(inputPatientId) }, [inputPatientId]);

  const onChangePatient = (value) => {
    const idPatient = value;

    if (idPatient > 0) {
      const dataPatient = patientsList.filter(patient => String(patient.id).includes(idPatient));
      const dataUser = usersList.filter(user => String(user.id).includes(String(dataPatient[0]?.idUser)));
      setValue('patientName', dataUser[0]?.name);
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

  const [isMedication, setIsMedication] = useState(false);
  const inputMedication = watch('medicationPrescribed');
  useEffect(() => { 
    inputMedication === "" ? setIsMedication(true) : setIsMedication(false);
  }, [inputMedication]);

  const isAppointmentRegistered = (dataForm) => {
    let filteredPatientAppointments = appointmentsList.filter(appointment => String(appointment.id_patient).includes(dataForm.id_patient))
    let filteredDate = filteredPatientAppointments.filter(appointment => appointment.appointment_date.includes(dataForm.appointment_date))
    let filteredHour = filteredDate.filter(appointment => appointment.appointment_hour.includes(dataForm.appointment_hour))

    if (filteredHour.length > 0) {
        messageApi.open({ type: 'error', content: 'Esse paciente já possui consulta cadastrada nesse dia e horário.' })
        filteredPatientAppointments = []
        filteredDate = []
        filteredHour = []
        return true
    }

    return false
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

    appointmentId ? onUpdate(data) : onSave(data);
  }

  const onUpdate = async(submitData) => {
    await AppointmentService.Update(appointmentId, submitData)
        .then((response) => {
          switch (response.status) {
            case 200:
              reset();
              window.location.reload(true);
              return alert('Sucesso! Consulta editada.');
            case 400:
              reset();
              return alert(`Erro no cadastro! Por favor, tente novamente.`);
            case 500:
              reset();
              return alert(`Erro no cadastro! Por favor, tente novamente.`);
          }
        })
        .catch((error) => {
            alert('Erro no cadastro. Por favor, tente novamente.')
            console.error('Erro ao cadastrar consulta:', error);
            reset();
        });
  };

  const onSave = async(submitData) => {
    if (isAppointmentRegistered(submitData)) { return }

    await AppointmentService.Create(submitData)
      .then((response) => { 
        switch (response.status) {
          case 201:
            reset();
            window.location.reload(true);
            return alert('Sucesso! Consulta cadastrada.');
          case 400:
            reset();
            return alert(`Erro no cadastro! Por favor, tente novamente.`);
          case 500:
            reset();
            return alert(`Erro no cadastro! Por favor, tente novamente.`);
        }
      })
      .catch((error) => {
        alert('Erro no cadastro. Por favor, tente novamente.');
        console.error('Erro ao cadastrar consulta:', error);
        reset();
      });
  };

  const onDelete = async() => {
    const response = await AppointmentService.Delete(appointmentId);

    switch (response.status) {
      case 202:
        reset();
        window.location.reload(true);
        return alert('Sucesso! Consulta excluída.');
      case 400:
        reset();
        return alert(`Erro na exclusão! Consulta não existe.`);
      case 500:
        reset();
        return alert(`Erro na exclusão! Por favor, tente novamente.`);
    }
  };

  const [isEditActive, setIsEditActive] = useState(false);

  return (
    <>

      <Styled.Form onSubmit={ handleSubmit(onSubmitForm) }>

        <Styled.Header>

          <Styled.Title>
            {
              patientName
              ? `Consulta de ${ patientName }`
              : 'Formulário de Consulta' 
            }
          </Styled.Title>

          <Styled.LabelSwitch>Editar</Styled.LabelSwitch>

          <Styled.SwitchBtn>
            <Switch 
              defaultChecked={ isEditActive }
              disabled={ !appointmentId }
              onClick={ () => setIsEditActive(!isEditActive) } 
              onChange={ () => setIsEditActive(!isEditActive) }
            />
          </Styled.SwitchBtn>

          <Styled.ButtonDel 
            $width={'10%'} 
            $active={ appointmentId } 
            type='button' 
            disabled={ !appointmentId } 
            onClick={ onDelete }
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
              label='Código do Paciente *'
              name='idPatient'
              min={ 1 }
              disabled={ appointmentId && isEditActive === false }
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
              label='Código do Médico(a) *'
              name='idDoctor'
              min={ 1 }
              disabled={ appointmentId && isEditActive === false }
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
              label='Motivo da Consulta *'
              name='appointmentReason'
              disabled={ appointmentId && isEditActive === false }
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
              label='Data da Consulta *'
              name='appointmentDate'
              disabled={ appointmentId && isEditActive === false }
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
              label='Hora da Consulta *'
              name='appointmentHour'
              disabled={ appointmentId && isEditActive === false }
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
              label='Descrição do Problema  *'
              disabled={ appointmentId && isEditActive === false }
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
              disabled={ appointmentId && isEditActive === false }
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
              label='Dosagem e Precauções *'
              disabled={ isMedication || (appointmentId && isEditActive === false)  }
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