import * as Styled from './FormExam.style';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Switch } from 'antd';
import { ExamService } from '../../Service/Exam.service';

import { PatientService } from '../../Service/Patient.service';

import { UserService } from '../../Service/User.service';

import { InputComponent } from '../Form/InputComponent/InputComponent';


export const FormExam = ({patientId}) => {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  let params = new URL(document.location).searchParams;
  const examId = params.get('id');

  useEffect(() => { 
    reset();
    fetchExamList();
    fetchPatientsList();
    fetchUsersList();
  }, [])

  const [examsList, setExamsList] = useState([]);
  
  const fetchExamList = async () => {
    ExamService.Get().then(result => setExamsList(result));
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
    if (examId !== null) { filterExam() }
  }, [examsList]);


    const [exam, setExam] = useState([]);
    const filterExam = () => {
      const filtereExam = examsList?.filter(exam => String(exam.id).includes(examId));
      setExam(filtereExam);
    }

    useEffect(() => {
      if(exam.length > 0) {
        setValue('idPatient', exam[0].id_patient);
        setValue('idDoctor', exam[0].id_doctor);
        setValue('nameExam', exam[0].nameExam);
        setValue('examDate', exam[0].dateExam);
        setValue('examHour',exam[0].hourExam);
        setValue('typeExam', exam[0].typeExam);
        setValue('labExam', exam[0].labExam);
        setValue('urlExam', exam[0].urlExam);
        setValue('resulExam', exam[0].resultExam);
      }
    },[exam])
    
    const inputPatientId = watch('idPatient');
    useEffect(()=>{onChangePatient(inputPatientId)}, [inputPatientId]);

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

  const isExamRegistered = (dataForm) => {
    let filteredPatientExams = examsList?.filter(exam => String(exam.id_patient).includes(dataForm.id_patient))
    let filteredDate = filteredPatientExams.filter(exam => exam.exam_date.includes(dataForm.exam_date))
    let filteredHour = filteredDate.filter(exam => exam.exam_hour.includes(dataForm.exam_hour))

    if (filteredHour.length > 0) {
        messageApi.open({ type: 'error', content: 'Esse paciente já possui exame cadastrado nesse dia e horário.' })
        filteredPatientExams = []
        filteredDate = []
        filteredHour = []
        return true
    }

    return false
  }

  const onSubmitForm = async(dataForm) => {
    const data = {
      id_patient: dataForm.id_patient,
      id_doctor: dataForm.id_doctor,
      nameExam: dataForm.nameExam,
      dateExam: dataForm.dateExam,
      hourExam: dataForm.hourExam,
      typeExam: dataForm.typeExam,
      labExam: dataForm.labExam,
      urlExam: dataForm.urlExam,
      resultExam: dataForm.resultExam,
      status: true
    }
    examId ? onUpdate(data) : onSave(data);
  }

  const onUpdate = async(submitData) => {
    await ExamService.Update(examId, submitData)
        .then((response) => {
          switch (response.status) {
            case 200:
              reset();
              return alert('Sucesso! Exame editado.');
            case 400:
              reset();
              return alert(`Erro no cadastro! Por favor, tente novamente.` );
            case 500:
              reset();
              return alert(`Erro no cadastro! Por favor, tente novamente.` );
          }
        })
        .catch((error) => {
          alert('Erro no cadastro. Por favor, tente novamente.' )
          console.error('Erro ao cadastrar consulta:', error);
          reset();
      });
};

const onSave = async(submitData) => {
  if (isExamRegistered(submitData)) { return }

  await ExamService.Create(submitData)
    .then((response) => { 
      switch (response.status) {
        case 201:
          reset();
          return alert('Sucesso! Consulta cadastrada.' );
        case 400:
          reset();
          return alert(`Erro no cadastro! Por favor, tente novamente.` );
        case 500:
          reset();
          return alert(`Erro no cadastro! Por favor, tente novamente.` );
      }
    })
    .catch((error) => {
      alert('Erro no cadastro. Por favor, tente novamente.' );
      console.error('Erro ao cadastrar consulta:', error);
      reset();
    });
};

  
const onDelete = async() => {
  const response = await ExamService.Delete(examId);

  switch (response.status) {
    case 202:
      reset();
      return alert('Sucesso! Exame excluído.' );
    case 400:
      reset();
      return alert(`Erro na exclusão! Exame não existe.` );
    case 500:
      reset();
      return alert(`Erro na exclusão! Por favor, tente novamente.` );
  }
};

const [isEditActive, setIsEditActive] = useState(false);

  return (
    <>

      <Styled.Form onSubmit={ handleSubmit(onSubmitForm) }>

        <Styled.Header>

          <Styled.Title>Exame de { watch('patientName') }</Styled.Title>

          <Styled.LabelSwitch>Editar</Styled.LabelSwitch>

          <Styled.SwitchBtn>
            <Switch 
              defaultChecked={ isEditActive }
              disabled={ !examId }
              onClick={ () => setIsEditActive(!isEditActive) } 
              onChange={ () => setIsEditActive(!isEditActive) }
            />
          </Styled.SwitchBtn>

          <Styled.ButtonDel 
            $width={'10%'} 
            $active={ examId } 
            type='button' 
            disabled={ !examId } 
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
              id='id_patient'
              type='number'
              placeholder='Digite o código'
              label='Código do Paciente *'
              name='id_patient'
              min={ 1 }
              disabled={ true }
              register={{
                ...register('id_patient', {
                  required: true,
                })
              }}
              error={ errors.id_patient }
            />
         <InputComponent $width={'100%'}
              id='id_doctor'
              type='number'
              placeholder='Digite o código'
              label='Código do medico *'
              name='id_doctor'
              min={ 1 }
              disabled={ true }
              register={{
                ...register('id_doctor', {
                  required: true,
                })
              }}
              error={ errors.id_doctor }
            />

            <InputComponent $width={'350%'}
              id='nameExam'
              type='string'
              placeholder='Nome do exame'
              label='Nome do Exame'
              name='nameExam'
              disabled={ true }
              register={{
                ...register('nameExam', {
                  required: true,
                  minLength: 8 ,
                  maxLength: 64 ,
                })
              }}
              error={ errors.nameExam }
            />
          </Styled.InputGroup>

          <Styled.InputGroup>
            <InputComponent $width={'350%'}
              id='typeExam'
              type='string'
              placeholder='Digite o tipo de exame'
              label='Tipo de Exame *'
              name='typeExam'
              disabled={ examId && isEditActive === false }
              register={{
                ...register('typeExam', {
                  required: true,
                  minLength: 8 ,
                  maxLength: 64 ,
                })
              }}
              error={ errors.typeExam }
            />
             <InputComponent $width={'350%'}
              id='labExam'
              type='string'
              placeholder='Nome do laboratorio'
              label='Nome do laboratorio'
              name='labExam'
              disabled={ true }
              register={{
                ...register('labExam', {
                  required: true,
                  minLength: 8 ,
                  maxLength: 64 ,
                })
              }}
              error={ errors.labExam }
            />

            <InputComponent $width={'100%'}
              id='dateExam'
              type='date'
              placeholder='Digite a data do exame'
              label='Data do Exame *'
              name='dateExam'
              disabled={ examId && isEditActive === false }
              register={{
                ...register('dateExam', {
                  required: true,
                })
              }}
              error={ errors.dateExam }
            />

            <InputComponent $width={'100%'}
              id='hourExam'
              type='time'
              placeholder='Digite o hora do exame'
              label='Hora do exame *'
              name='hourExam'
              disabled={ examId && isEditActive === false }
              register={{
                ...register('hourExam', {
                  required: true,
                })
              }}
              error={ errors.hourExam }
            />
          </Styled.InputGroup>

          <Styled.InputGroup>
            <InputComponent $height={'100px'}
              id='urlExam'
              type='text'
              placeholder='Insira link do documento'
              name='urlExam'
              label='Link do documento*'
              disabled={ examId && isEditActive === false }
              register={{
                ...register('urlExam', {
                  required: false,
                })
              }}
              error={ errors.urlExam }
            />
          </Styled.InputGroup>
          <Styled.InputGroup>
            <InputComponent $height={'100px'}
              id='resultExam'
              type='textarea'
              placeholder='Descreva o problema'
              name='resultExam'
              label='Resultado do Exame  *'
              disabled={ examId && isEditActive === false }
              register={{
                ...register('resultExam', {
                  required: true,
                  minLength: 16 ,
                  maxLength: 1024 ,
                })
              }}
              error={ errors.resultExam }
            />
          </Styled.InputGroup>
        </Styled.MainForm>
      </Styled.Form>
    </>
  )
}