import * as Styled from "./FormExercise.style";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Switch } from "antd";
import { ExerciseService } from "../../Service/Exercise.sevice";

import { PatientService } from "../../Service/Patient.service";

import { UserService } from "../../Service/User.service";

import { InputComponent } from "../Form/InputComponent/InputComponent";
import {SelectComponent} from "../SelectComponent/SelectComponent";

export const FormExercise = ({ patientId }) => {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const typeExercise = [
    {
      id: 1,
      value: "RESISTÊNCIA AERÓBICA",
      label: "RESISTÊNCIA AERÓBICA",
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
  const filterExercise = () => {
    const filtereExercise = exercisesList?.filter((exercise) =>
      String(exercise.id).includes(exerciseId)
    );
    setExercise(filtereExercise);
  };

  useEffect(() => {
    if (exercise.length > 0) {
      setValue("idPatient", exercise[0].id_patient);
      setValue("idNurse", exercise[0].id_nurse);
      setValue("seriesName", exercise[0].seriesName);
      setValue("dateExercise", exercise[0].dateExercise);
      setValue("hourExercise", exercise[0].hourExercise);
      setValue("typeExercise", exercise[0].typeExercise);
      setValue("amountWeek", exercise[0].amountWeek);
      setValue("descritionExercise", exercise[0].descritionExercise);
      setValue("statusExercise",exercise[0].statusExercise);
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

  const inputNurseId = watch("idNurse");
  useEffect(() => {
    onChangeNurse(inputNurseId);
  }, [inputNurseId]);

  const onChangeNurse = (value) => {
    const idDoctor = value;

    if (idNurse > 0) {
      const dataNurse = usersList.filter((user) =>
        String(user.id).includes(idNurse)
      );
      setValue("nurseName", dataNurse[0]?.name);
    }
  };

  const onSubmitForm = async (dataForm) => {
    const data = {
      id_patient: dataForm.idPatient,
      id_nurse: dataForm.idNurse,
      seriesName: dataForm.seriesName,
      dateExercise: dataForm.dateExercise,
      hourExercise: dataForm.hourExercise,
      typeExercise: dataForm.typeExercise,
      amountWeek: dataForm.amountWeek,
      descritionExercise: dataForm.descritionExercise,
      statusExercise: dataForm.statusExercise,
    };
    exerciseId ? Update(data) : Save(data);
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
    
    await ExerciseService.Create(submitData)
      .then((response) => {
       
        switch (response.status) {
          case 201:
            reset();
            window.location.reload(true);
            return alert("Sucesso! Série de exercicio cadastrada.");
          case 400:
            return alert(`Erro no cadastro! Por favor, tente novamente.`);
          case 500:
            reset();
            return alert(`Erro no cadastro! Por favor, tente novamente.`);
        }
      })
      .catch((error) => {
        alert("Erro no cadastro. Por favor, tente novamente.");
        console.error("Erro ao cadastrar série de exercicio :", error);
        reset();
      });
  };

  const Delete = async () => {
    const response = await ExerciseService.Delete(exerciseId);

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
            $active={exerciseId}
            type="button"
            disabled={!exerciseId}
            onClick={Delete}
          >
            Deletar
          </Styled.ButtonDel>

          <Styled.Button $width={"10%"} $active={true} type="submit">
            Salvar
          </Styled.Button>
        </Styled.Header>

        <Styled.Paragraph> Campos obrigatórios</Styled.Paragraph>

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
              disabled={exerciseId && isEditActive === false}
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
              id="idNurse"
              type="number"
              placeholder="Digite o código"
              label="Código do enfermeiro *"
              name="idNurse"
              min={1}
              disabled={exerciseId && isEditActive === false}
              register={{
                ...register("idNurse", {
                  required: true,
                }),
              }}
              error={errors.idNurse}
            />
            <InputComponent
              $width={"350%"}
              id="nurseName"
              type="string"
              placeholder="Nome do enfermeiro(a)"
              label="Nome do enfermeiro(a)"
              name="nurseName"
              disabled={true}
              register={{
                ...register("nurseName", {
                  required: false,
                }),
              }}
              error={errors.nurseName}
            />
          </Styled.InputGroup>

          <Styled.InputGroup>
            <InputComponent
              $width={"350%"}
              id="seriesName"
              type="string"
              placeholder="Série de exercicios"
              label="Série de exercicios"
              name="seriesName"
              disabled={exerciseId && isEditActive === false}
              register={{
                ...register("seriesName", {
                  required: true,
                  minLength: 5,
                  maxLength: 100,
                }),
              }}
              error={errors.seriesName}
            />

            <InputComponent
              $width={"350%"}
              id="amountWeek"
              type="number"
              placeholder="Quantidade por semana"
              label="Quantidade por semana"
              name="amountWeek"
              disabled={exerciseId && isEditActive === false}
              register={{
                ...register("amountWeek", {
                  required: true
                }),
              }}
              error={errors.amountWeek}
            />
          </Styled.InputGroup>

          <Styled.InputGroup>
          <SelectComponent
            $width={"20%"}
            id="typeExercise"
            name="typeExercise"
            label={"Tipo de série de exercicios"}
            disabled={exerciseId && isEditActive === false}
            options={typeExercise}
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
              disabled={exerciseId && isEditActive === false}
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
              disabled={exerciseId && isEditActive === false}
              register={{
                ...register("hourExercise", {
                  required: true,
                }),
              }}
              error={errors.hourExercise}
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
              disabled={exerciseId && isEditActive === false}
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
              <Styled.SelectLabel $color={errors.status && 'danger'} htmlFor='statusExercise'>Status do Sistema *</Styled.SelectLabel>
              <Styled.Select
                id='statusExercise'
                name='statusExercise'
                defaultValue={''}
                disabled={exerciseId && isEditActive === false}
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