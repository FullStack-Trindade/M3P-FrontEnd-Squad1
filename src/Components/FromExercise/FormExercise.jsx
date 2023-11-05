import * as Styled from "./FormExam.style";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Switch } from "antd";
import { ExerciseService } from "../../Service/Exercise.sevice";

import { PatientService } from "../../Service/Patient.service";

import { UserService } from "../../Service/User.service";

import { InputComponent } from "../Form/InputComponent/InputComponent";
import {SelectComponent} from "../SelectComponent/SelectComponent";

export const FormExercise = ({ patientId }) => {

  const typeExercise = [
    {
      id: 1,
      value: "RESISTÊNCIA AREÓBICA",
      label: "RESISTÊNCIA AREÓBICA",
    },

    {
      id: 2,
      value: "RESISTÊNCIA MUSCULAR",
      label: "RESISTÊNCIA MUSCULAR",
    },

    {
      id: 3,
      value: "FLEXIBILIDADE",
      label: "FLEXIBILIDADE",
    },
    {
      id: 4,
      value: "FORÇA",
      label: "FORÇA",
    },
    {
      id: 5,
      value: "AGILIDADE",
      label: "AGILIDADE",
    },
    {
      id: 6,
      value: "OUTROS",
      label: "OUTROS",
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  let params = new URL(document.location).searchParams;
  const exerciseId = params.get("id");

  useEffect(() => {
    reset();
    fetchExercisesList();
    fetchPatientsList();
    fetchUsersList();
  }, [])

  const [exercisesList, setExercisesList] = useState([]);
  const fetchExercisesList = async () => {
    ExerciseService.Get().then(result => setExercisesList(result));
  }
  console.log(exercisesList);

  const [patientsList, setPatientsList] = useState([]);

  const fetchPatientsList = async () => {
    PatientService.Get().then((result) => setPatientsList(result));
  };

  const [usersList, setUsersList] = useState([]);
  const fetchUsersList = async () => {
    UserService.Get().then((result) => setUsersList(result));
  };

  useEffect(() => {
    setValue("idPatient", patientId);
  }, [patientId]);

  useEffect(() => {
    if (exerciseId !== null) {
      filterExercise();
    }
  }, [exercisesList]);

  const [exercise, setExercise] = useState([]);
  const filterExam = () => {
    const filtereExercise = exercisesList?.filter((exercise) =>
      String(exercise.id).includes(exerciseId)
    );
    setExam(filtereExercise);
  };

  useEffect(() => {
    if (exercise.length > 0) {
      setValue("idPatient", exam[0].id_patient);
      setValue("idDoctor", exam[0].id_doctor);
      setValue("nameExam", exam[0].nameExam);
      setValue("dateExam", exam[0].dateExam);
      setValue("hourExam", exam[0].hourExam);
      setValue("typeExam", exam[0].typeExam);
      setValue("labExam", exam[0].labExam);
      setValue("urlExam", exam[0].urlExam);
      setValue("resultExam", exam[0].resultExam);
      setValue("statusExam", exam[0].statusExam);
      
    }
  }, [exercise]);

  const inputPatientId = watch("idPatient");
  const patientName = watch('patientName');
  useEffect(() => {
    onChangePatient(inputPatientId);
  }, [inputPatientId]);

  const onChangePatient = (value) => {
    const idPatient = value;

    if (idPatient > 0) {
      const dataPatient = patientsList.filter((patient) =>
        String(patient.id).includes(idPatient)
      );
      const dataUser = usersList.filter((user) =>
        String(user.id).includes(String(dataPatient[0]?.idUser))
      );
      setValue("patientName", dataUser[0]?.name);
    }
  };

  const inputDoctorId = watch("idDoctor");
  useEffect(() => {
    onChangeDoctor(inputDoctorId);
  }, [inputDoctorId]);

  const onChangeDoctor = (value) => {
    const idDoctor = value;

    if (idDoctor > 0) {
      const dataDoctor = usersList.filter((user) =>
        String(user.id).includes(idDoctor)
      );
      setValue("doctorName", dataDoctor[0]?.name);
    }
  };

  const isExerciseRegistered = (dataForm) => {
    // let filteredPatientExams = examsList?.filter(exam => String(exam.id_patient).includes(dataForm.id_patient))
    // let filteredDate = filteredPatientExams.filter(exam => exam.exam_date.includes(dataForm.exam_date))
    // let filteredHour = filteredDate.filter(exam => exam.exam_hour.includes(dataForm.exam_hour))

    // if (filteredHour.length > 0) {
    //     messageApi.open({ type: 'error', content: 'Esse paciente já possui exame cadastrado nesse dia e horário.' })
    //     filteredPatientExams = []
    //     filteredDate = []
    //     filteredHour = []
    //     return true
    // }

    return false;
  };

  const onSubmitForm = async (dataForm) => {
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
      statusExam: dataForm.statusExam,
    };
    console.log(data);
    examId ? Update(data) : Save(data);
  };

  const Update = async (submitData) => {
    await ExerciseService.Update(exerciseId, submitData)
      .then((response) => {
        switch (response.status) {
          case 200:
            reset();
            return alert("Sucesso! Série de exercicio editado.");
          case 400:
            reset();
            return alert(`Erro no cadastro! Por favor, tente novamente.`);
          case 500:
            reset();
            return alert(`Erro no cadastro! Por favor, tente novamente.`);
        }
      })
      .catch((error) => {
        alert("Erro no cadastro. Por favor, tente novamente.");
        console.error("Erro ao cadastrar série de exercicio:", error);
        reset();
      });
  };

  const Save = async (submitData) => {
    if (isExerciseRegistered(submitData)) {
      return;
    }

    await ExerciseService.Create(submitData)
      .then((response) => {
        console.log(response);
        switch (response.status) {
          case 201:
            reset();
            window.location.reload(true);
            return alert("Sucesso! Exame cadastrada.");
          case 400:
            console.log(response);
            return alert(`Erro no cadastro! Por favor, tente novamente.`);
          case 500:
            reset();
            return alert(`Erro no cadastro! Por favor, tente novamente.`);
        }
      })
      .catch((error) => {
        alert("Erro no cadastro. Por favor, tente novamente.");
        console.error("Erro ao cadastrar exame:", error);
        reset();
      });
  };

  const Delete = async () => {
    const response = await ExerciseService.Delete(exerciseId);
    console.log(response);

    switch (response.status) {
      case 202:
        reset();
        return alert("Sucesso! Série de exercicio excluído.");
      case 400:
        reset();
        return alert(`Erro na exclusão! Série de exercicio não existe.`);
      case 500:
        reset();
        return alert(`Erro na exclusão! Por favor, tente novamente.`);
    }
  };

  const [isEditActive, setIsEditActive] = useState(false);

  return (
    <>
      <Styled.Form onSubmit={handleSubmit(onSubmitForm)}>
        <Styled.Header>
          <Styled.Title>
            {
              patientName
                ? `Exercicio de ${patientName}`
                : 'Formulário de exercicio'
            }
          </Styled.Title>

          <Styled.LabelSwitch>Editar</Styled.LabelSwitch>

          <Styled.SwitchBtn>
            <Switch
              defaultChecked={isEditActive}
              disabled={!exerciseId}
              onClick={() => setIsEditActive(!isEditActive)}
              onChange={() => setIsEditActive(!isEditActive)}
            />
          </Styled.SwitchBtn>

          <Styled.ButtonDel
            $width={"10%"}
            $active={examId}
            type="button"
            disabled={!examId}
            onClick={Delete}
          >
            Deletar
          </Styled.ButtonDel>

          <Styled.Button $width={"10%"} $active={true} type="submit">
            Salvar
          </Styled.Button>
        </Styled.Header>

        <Styled.Paragraph>* Campos obrigatórios</Styled.Paragraph>

        <Styled.MainForm $width={"100%"}>
          <Styled.InputGroup>
            <InputComponent
              $width={"100%"}
              id="idPatient"
              type="number"
              placeholder="Digite o código"
              label="Código do Paciente *"
              name="idPatient"
              min={1}
              disabled={examId && isEditActive === false}
              register={{
                ...register("idPatient", {
                  required: true,
                }),
              }}
              error={errors.idPatient}
            />
            <InputComponent
              $width={"350%"}
              id="patientName"
              type="string"
              placeholder="Nome do paciente"
              label="Nome do Paciente"
              name="patientName"
              disabled={true}
              register={{
                ...register("patientName", {
                  required: false,
                }),
              }}
              error={errors.patientName}
            />
            <InputComponent
              $width={"100%"}
              id="idDoctor"
              type="number"
              placeholder="Digite o código"
              label="Código do medico *"
              name="idDoctor"
              min={1}
              disabled={examId && isEditActive === false}
              register={{
                ...register("idDoctor", {
                  required: true,
                }),
              }}
              error={errors.idDoctor}
            />
            <InputComponent
              $width={"350%"}
              id="doctorName"
              type="string"
              placeholder="Nome do médico(a)"
              label="Nome do médico(a)"
              name="doctorName"
              disabled={true}
              register={{
                ...register("doctorName", {
                  required: false,
                }),
              }}
              error={errors.doctorName}
            />
            <InputComponent
              $width={"350%"}
              id="seriesName"
              type="string"
              placeholder="Série de exercicios"
              label="Série de exercicios"
              name="seriesName"
              disabled={examId && isEditActive === false}
              register={{
                ...register("seriesName", {
                  required: true,
                  minLength: 8,
                  maxLength: 64,
                }),
              }}
              error={errors.seriesName}
            />
          </Styled.InputGroup>

          <Styled.InputGroup>

          <SelectComponent
            $width={"20%"}
            id="typeExercise"
            name="typeExercise"
            label={"Tipo de série de exercicios"}
            options={genders}
            register={{
              ...register("typeExercise", {
                required: true,
              }),
            }}
            error={errors.typeExercise}
          />

            <InputComponent
              $width={"100%"}
              id="dateExercise"
              type="date"
              placeholder="Digite a data do exercicio"
              label="Data do exercicio *"
              name="dateExercise"
              disabled={examId && isEditActive === false}
              register={{
                ...register("dateExercise", {
                  required: true,
                }),
              }}
              error={errors.dateExercise}
            />

            <InputComponent
              $width={"100%"}
              id="hourExercise"
              type="time"
              placeholder="Digite o hora do exercicio"
              label="Hora do exercicio *"
              name="hourExercise"
              disabled={examId && isEditActive === false}
              register={{
                ...register("hourExercise", {
                  required: true,
                }),
              }}
              error={errors.hourhourExerciseExam}
            />
          </Styled.InputGroup>

          <Styled.InputGroup>
            <InputComponent
              $height={"100px"}
              id="descritionExercise"
              type="textarea"
              placeholder="Descreva a série de exercicio a ser feita."
              name="descritionExercise"
              label="Série de exercicio  *"
              disabled={examId && isEditActive === false}
              register={{
                ...register("descritionExercise", {
                  required: true,
                  minLength: 10,
                  maxLength: 1000,
                }),
              }}
              error={errors.descritionExercise}
            />
          </Styled.InputGroup>
          <Styled.InputGroup>
            <Styled.SelectGroup>
              <Styled.SelectLabel $color={errors.status && 'danger'} htmlFor='statusExam'>Status do Sistema *</Styled.SelectLabel>
              <Styled.Select
                id='statusExercise'
                name='statusExercise'
                defaultValue={''}
                disabled={examId && isEditActive === false}
                {...register('statusExercise', { required: true })}
                $color={errors.dietType && 'danger'}
              >
                <option value={''} disabled>Selecione o status do sistema</option>
                <option value={true}>ATIVO</option>
                <option value={false}>INATIVO</option>
              </Styled.Select>
            </Styled.SelectGroup>
          </Styled.InputGroup>
        </Styled.MainForm>
      </Styled.Form>
    </>
  );
};