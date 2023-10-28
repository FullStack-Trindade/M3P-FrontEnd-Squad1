import * as Styled from './FormExam.style';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Switch } from 'antd';

import { ExamService } from '../../Service/Exam.service';
import {PatientService} from '../../Service/Patient.service';
import { UserService } from '../../Service/User.service';

import { InputComponent } from '../FormPaciente/InputComponent/InputComponent';


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
    fetchExamsList();
    fetchPatientsList();
    fetchUsersList();
  },[])

  const [examsList, setExamsList] = useState([]);
  const fetchExamsList = async () => {
    ExamService.Get().then(result => setExamsList(result));
  }

  const [patientsList, setPatientsList] = useState([]);
  const fetchPatientsList = async () => {
    PatientService.Get().then(result => setPatientsList(result));
  }

  const [usersList, setUsersList] = useState([]);
  const fetchUsersList = async() => {
    UserService.Get().then(result => setUsersList(result));
  }

   useEffect(() => {
    setValue('idPatient', patientId) } , [patientId])

    useEffect(() => {
      if (examId !== null) {filterExam()}
    }, [examsList]);
    
    const [exam, setExam] = useState([]);
    const filterExam = () => {
      const filtereExam = examsList.filter(exam => String(exam.id).includes(examId));
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
    let filteredPatientExams = examsList.filter(exam => String(exam.id_patient).includes(dataForm.id_patient))
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
      id_patient: dataForm.idPatient,
      id_doctor: dataForm.idDoctor,
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
          return alert('Sucesso! Exame cadastrado.' );
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
              id='idPatient'
              type='number'
              placeholder='Digite o código'
              label='Código do Paciente *'
              name='idPatient'
              min={ 1 }
              disabled={ true }
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
              disabled={ examId && isEditActive === false }
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
              disabled={ examId && isEditActive === false }
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
              disabled={ examId && isEditActive === false }
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
              disabled={ examId && isEditActive === false }
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
              disabled={ examId && isEditActive === false }
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
              disabled={ examId && isEditActive === false }
              register={{
                ...register('medicationPrescribed', {
                  required: false,
                })
              }}
              error={ errors.medicationPrescribed }
            />
          </Styled.InputGroup>
        </Styled.MainForm>
      </Styled.Form>
    </>
  )
}
//       }
//     }
//   const [userList, setUserList] = useState([]);
//   const fetchUsersList = async () => {
//     UserService.Get().then(result => setUserList(result));
//   }
  
//   const createExame = (exameData) => {
//     ExameService.CreateExame(exameData)
//       .then(response => {
//         console.log('Exame cadastrado com sucesso:', response);
//         reset();
//       })
//       .catch(error => {
//         console.error('Erro ao cadastrar Exame:', error);
//       });
//   };


//   const deleteExame = (exameData) => {
//     ExameService.DeleteExame(exameData.id)
//       .then(response => {
//         console.log('Exame deletado com sucesso:', response);
//         reset();
//       })
//       .catch(error => {
//         console.error('Erro ao deletar Exame:', error);
//       });
//   };

//   const submitForm = async (exameData) => {
//     const data = {...exameData, pacienteId: paciente[0].id}
//     console.log(data);
//     const exame = await ExameService.RegisterExam(data);

//     if (!exame) {
//       alert('Exame Cadastrado');
//       reset();

//     } else {
//       alert('Exame não cadastrado');
//     }

//   }

//     const [isLoading, setIsLoading] = useState()

//   return (
//     <Styled.Form onSubmit={handleSubmit(submitForm)}>

//       <Styled.Header>
//         <Styled.Title>Exame de {paciente.nome}</Styled.Title>


//         <Styled.LabelSwitch>
//           Editar
//         </Styled.LabelSwitch>

//         <Styled.SwitchBtn>
//           <Switch /* defaultChecked={menu} onClick={() => setMenu(!menu)} onChange={onChange} */ />
//         </Styled.SwitchBtn>


//         <Styled.ButtonDel $width={'10%'} $active={!errors.email && !errors.password} type='button' disabled={errors.email || errors.password}>Deletar</Styled.ButtonDel>
//         <Styled.Button onClick={() => setIsLoading(true)} $width={'10%'}  $active={!errors.email && !errors.password} type='submit' disabled={errors.email || errors.password}>{'Salvar'}</Styled.Button>
//       </Styled.Header>


//       <Styled.MainForm $width={'100%'}>
//         <Styled.InputGroup>

//           <InputComponent $width={'350%'}
//             id='exameNome'
//             type='string'
//             placeholder='Nome do Exame'
//             label='Nome do Exame'
//             name='exameNome'
//             register={{
//               ...register('exameNome', {
//                 required: true,
//                 minLenght: 5 ,
//                 maxLenght: 50 ,
//               })
//             }}
//             error={errors.exameNome}
//           />


//           <InputComponent $width={'100%'}
//             id='dataExame'
//             type='date'
//             placeholder='Digite a data'
//             label='Data da Exame'
//             name='dataExame'
//             register={{
//               ...register('dataExame', {
//                 required: true,
//               })
//             }}
//             error={errors.dataExame}
//           />

//           <InputComponent $width={'100%'}
//             id='hora'
//             type='hour'
//             placeholder='Digite o hora do exame'
//             label='Hora do exame'
//             name='hora'
//             register={{
//               ...register('hora', {
//                 required: true,
//               })
//             }}
//             error={errors.nome}
//           />
//         </Styled.InputGroup>

//         <Styled.InputGroup  >

//           <InputComponent
//             id='tipoExame'
//             type='string'
//             placeholder='Tipo de Exame'
//             name='tipoExame'
//             label='Tipo de Exame'
//             register={{
//               ...register('tipoExame', {
//                 required: true,
//                 minLenght: 5 ,
//                 maxLenght: 30 ,
//               })
//             }}
//             error={errors.tipoExame}
//           />

//           <InputComponent 
//             id='labExame'
//             type='string'
//             placeholder='Laboratório'
//             name='labExame'
//             label='Laboratório'
//             register={{
//               ...register('labExame', {
//                 required: true,
//                 minLenght: 5 ,
//                 maxLenght: 30 ,
//               })
//             }}
//             error={errors.labExame}
//           />

//         </Styled.InputGroup>

//         <Styled.InputGroup>


//           <InputComponent 
//             id='urlExame'
//             type='url'
//             placeholder='URL do Documento do Exame'
//             name='urlExame'
//             label='URL do Documento do Exame'
//             register={{
//               ...register('urlExame', {
//                 required: false,
//               })
//             }}
//             error={errors.urlExame}
//           />

//         </Styled.InputGroup>

//         <Styled.InputGroup>


//           <InputComponent $height={'220px'}
//             id='resultadoExame'
//             type='textarea'
//             placeholder='Resultado do Exame'
//             name='resultadoExame'
//             label='Resultado do Exame'
//             register={{
//               ...register('resultadoExame', {
//                 required: true,
//                 minLenght: 15 ,
//                 maxLenght: 1000 ,
//               })
//             }}
//             error={errors.resultadoExame}
//           />

//         </Styled.InputGroup>
//       </Styled.MainForm>
//     </Styled.Form>
//   )
// }