import * as Styled from "./FormMedication.style";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Switch } from "antd";
import { useNavigate } from "react-router-dom";

import { SelectComponent } from "../Form/SelectComponent/SelectComponent";
import { PatientService } from "../../Service/Patient.service";
import { UserService } from "../../Service/User.service";
import { MedicationService } from "../../Service/Medication.service";
import { InputComponent } from "../Form/InputComponent/InputComponent";

export const FormMedication = ({ id, idPatient }) => {
  const typeMedicationList = [
    {
      id: 1,
      value: "CAPSULA",
      label: "CÁPSULA",
    },

    {
      id: 2,
      value: "COMPRIMIDO",
      label: "COMPRIMIDO",
    },

    {
      id: 3,
      value: "LIQUIDO",
      label: "LÍQUIDO",
    },
    {
      id: 4,
      value: "CREME",
      label: "CREME",
    },
    {
      id: 5,
      value: "GEL",
      label: "GEL",
    },
    {
      id: 6,
      value: "INALACAO",
      label: "INALAÇÃO",
    },
    {
      id: 7,
      value: "INJECAO",
      label: "INJEÇÃO",
    },
    {
      id: 8,
      value: "SPRAY",
      label: "SPRAY",
    },
  ];
  const unitMedicationList = [
    {
      id: 1,
      value: "MG",
      label: "mg",
    },

    {
      id: 2,
      value: "MCG",
      label: "mcg",
    },

    {
      id: 3,
      value: "G",
      label: "g",
    },
    {
      id: 4,
      value: "ML",
      label: "ml",
    },
    {
      id: 5,
      value: "PERCENT",
      label: "%",
    },
  ];

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idUser, setIdUser] = useState(false);

  //Estados dos botões
  const [formMode, setFormMode] = useState(null);
  const [editButtonDisabled, setEditButtonDisabled] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
  const [formInputsDisabled, setformInputsDisabled] = useState(false);
  const [specialFormInputsDisabled, setSpecialFormInputsDisabled] =
    useState(false);

  useEffect(() => {
    if (id) {
      buscarDadosMedicamentoCadastrado(id);
      setFormMode("read");
    } else {
      setFormMode("register");
      setValue("id_patient", idPatient);
      onChangePatient (idPatient);
                }
  }, [id , idPatient]);

  useEffect(() => {
    //mudar para switch (formMode) { case "read": set ....; breack;case... default:return}
    if (formMode === "read") {
      setEditButtonDisabled(false);
      setSaveButtonDisabled(true);
      setDeleteButtonDisabled(true);
      setformInputsDisabled(true);
      setSpecialFormInputsDisabled(true);
    }
    if (formMode === "edit") {
      setEditButtonDisabled(false);
      setSaveButtonDisabled(false);
      setDeleteButtonDisabled(false);
      setformInputsDisabled(false);
      setSpecialFormInputsDisabled(true);
    }
    if (formMode === "register") {
      setEditButtonDisabled(true);
      setSaveButtonDisabled(false);
      setDeleteButtonDisabled(true);
      setformInputsDisabled(false);
      setSpecialFormInputsDisabled(false);
    } else {
      return;
    }
  }, [formMode]);

  const buscarDadosMedicamentoCadastrado = (id) => {
    MedicationService.Get()
      .then((response) => {
        const medicationList = response;
        const medicationInDb = medicationList.find(
          (medication) => medication.id == id
        );

        if (medicationInDb) {
          setValue("id_patient", medicationInDb.id_patient);
          setValue("id_nurse", medicationInDb.id_nurse);
          setValue("nameMedication", medicationInDb.nameMedication);
          setValue("dateMedication", medicationInDb.dateMedication);
          setValue("hourMedication", medicationInDb.hourMedication);
          setValue("typeMedication", medicationInDb.typeMedication);
          setValue("amountMedication", medicationInDb.amountMedication);
          setValue("unitMedication", medicationInDb.unitMedication);
          setValue(
            "observationMedication",
            medicationInDb.observationMedication
          );
          setValue("status", medicationInDb.status);
        } else {
          alert(
            "Dados do medicamento não podem ser carregados. Tente novamente mais tarde."
          );
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(
          "Ocorreu um erro ao buscar os dados do medicamento:",
          error
        );
        alert(
          "Ocorreu um erro ao buscar os dados do medicamento. Tente novamente mais tarde."
        );
      });
  };
  const submitForm = async (medicationData) => {
    
    setIsLoading(true);
    if (id) {
       updateMedication(medicationData);
    } else {
      medicationData.status = "true";
      createPaciente(medicationData);
    }
    setIsLoading(false);
  };

  const createPaciente = async (medicationData) => {
    try {
      await MedicationService.Update(id, medicationData).then((response) => {
        setIsSubmitSuccessful;
        alert("Medicação salva com sucesso");
        navigate("/");
      });
    } catch (error) {
      alert("Erro no cadastro. Por favor, tente novamente.");
      console.error("Erro ao cadastrar consulta:", error);
    }
  };

  const updateMedication = async (medicationData) => {
    
    try {
      await MedicationService.Update(id, medicationData).then((response) => {
               setIsSubmitSuccessful;
        alert("Medicação atualizada com sucesso");
        navigate("/");
      });
    } catch (error) {
      alert("Erro no cadastro. Por favor, tente novamente.");
      console.error("Erro ao cadastrar consulta:", error);
    }
  };

  const deleteMedication = () => {
    MedicationService.Delete(id).then((response) => {
      if ((response.status = 202)) {
        alert("Medicamento Deletado com Sucesso");
        navigate("/");
      } else {
        alert("Erro ao Deletar o Medicamento");
      }
    });
  };

  // CARREGAR LISTA DE USUÁRIOS, PACIENTES E FAZER ALTERAÇÃO DINÂMICA NA TELA
  useEffect(() => {
    fetchPatientsList();
    fetchUsersList();
  }, []);

  const [patientsList, setPatientsList] = useState([]);

  const fetchPatientsList = async () => {
    PatientService.Get().then((result) => setPatientsList(result));
  };

  const [usersList, setUsersList] = useState([]);
  const fetchUsersList = async () => {
    UserService.Get().then((result) => setUsersList(result));
  };

  const inputPatientId = watch("id_patient");

  const patientName = watch("patientName");
  
   useEffect(() => {
    onChangePatient(inputPatientId);
  }, [inputPatientId, idPatient, formMode]);
  
  const onChangePatient = (value) => {
    const id_patient = value;
  
    if (id_patient > 0) {
      const dataPatient = patientsList.find((patient) =>
        String(patient.id).includes(id_patient)
      );
      if (dataPatient) {
        const dataUser = usersList.find((user) =>
          String(user.id).includes(String(dataPatient.idUser))
        );
        setValue("patientName", dataUser.name);
      }
    }
  };
  

  const inputNurseId = watch("id_nurse");
  useEffect(() => {
    onChangeNurse(inputNurseId);
  }, [inputNurseId]);

  const onChangeNurse = (value) => {
    const id_nurse = value;

    if (id_nurse > 0) {
      const dataNurse = usersList.filter((user) =>
        String(user.id).includes(id_nurse)
      );
      setValue("nurseName", dataNurse[0]?.name);
    }
  };

  
  return (
    <>
      <Styled.Form
        onSubmit={handleSubmit(submitForm)}>
        <Styled.Header>
          <Styled.Title>Identificação {patientName} </Styled.Title>

          <Styled.LabelSwitch>Editar</Styled.LabelSwitch>

          <Styled.SwitchBtn>
            <Switch
              disabled={editButtonDisabled}
              onClick={() => {
                if (formMode === "read") {
                  setFormMode("edit");
                } else {
                  setFormMode("read");
                }
              }}
            />
          </Styled.SwitchBtn>

          <Styled.ButtonDel
            $width={"10%"}
            onClick={deleteMedication}
            $active={!errors.email && !errors.password}
            type="button"
            disabled={deleteButtonDisabled}
          >
            Deletar
          </Styled.ButtonDel>

          <Styled.Button
            $width={"10%"}
            $active={!errors.email && !errors.password}
            type="submit"
            disabled={errors.email || errors.password || saveButtonDisabled}
          >
            {isSubmitSuccessful ? "Salvo!" : isLoading ? <Spin /> : "Salvar"}
          </Styled.Button>
        </Styled.Header>

        <Styled.Paragraph>* Campos obrigatórios</Styled.Paragraph>

        <Styled.MainForm $width={"100%"}>
          <Styled.InputGroup>
            <InputComponent
              $width={"100%"}
              id="id_patient"
              type="number"
              placeholder="Digite o código"
              label="Código do Paciente *"
              name="id_patient"
              min={1}
              disabled={true}
              register={{
                ...register("id_patient", {
                  required: true,
                }),
              }}
              error={errors.id_patient}
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
              id="id_nurse"
              type="number"
              placeholder="Digite o código"
              label="Código do Enfermeiro(a) *"
              name="id_nurse"
              min={1}
              disabled={specialFormInputsDisabled}
              register={{
                ...register("id_nurse", {
                  required: true,
                }),
              }}
              error={errors.id_nurse}
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
              id="nameMedication"
              type="string"
              placeholder="Digite o nome do medicamento"
              label="Nome do Medicamento *"
              name="nameMedication"
              disabled={formInputsDisabled}
              register={{
                ...register("nameMedication", {
                  required: true,
                  minLength: 5,
                  maxLength: 100,
                }),
              }}
              error={errors.nameMedication}
            />

            <InputComponent
              $width={"75%"}
              id="dateMedication"
              type="date"
              placeholder="Digite a data do medicamento"
              label="Data do Medicamento*"
              name="dateMedication"
              disabled={formInputsDisabled}
              register={{
                ...register("dateMedication", {
                  required: true,
                }),
              }}
              error={errors.dateMedication}
            />

            <InputComponent
              $width={"75%"}
              id="hourMedication"
              type="time"
              placeholder="Digite o hora do medicamento"
              label="Hora do Medicamento *"
              name="hourMedication"
              disabled={formInputsDisabled}
              register={{
                ...register("hourMedication", {
                  required: true,
                }),
              }}
              error={errors.hourMedication}
            />
            <SelectComponent
              $width={"50%"}
              id="typeMedication"
              name="typeMedication"
              label={"Tipo de Medicação*"}
              options={typeMedicationList}
              disabled={formInputsDisabled}
              register={{
                ...register("typeMedication", {
                  required: true,
                }),
              }}
              error={errors.typeMedication}
            />
          </Styled.InputGroup>

          <Styled.InputGroup>
            <InputComponent
              $width={"30%"}
              id="amountMedication"
              type="number"
              placeholder="Quantidade"
              name="amountMedication"
              label="Quantidade de medicamento*"
              disabled={formInputsDisabled}
              register={{
                ...register("amountMedication", {
                  required: true,
                }),
              }}
              error={errors.amountMedication}
            />
            <SelectComponent
              $width={"30%"}
              id="unitMedication"
              name="unitMedication"
              label={"Unidade *"}
              options={unitMedicationList}
              disabled={formInputsDisabled}
              register={{
                ...register("unitMedication", {
                  required: true,
                }),
              }}
              error={errors.unitMedication}
            />
            <InputComponent
              $height={"70px"}
              id="observationMedication"
              type="textarea"
              placeholder="Observações *"
              name="observationMedication"
              label="Medicação Receitada"
              disabled={formInputsDisabled}
              register={{
                ...register("observationMedication", {
                  required: false,
                }),
              }}
              error={errors.observationMedication}
            />
          </Styled.InputGroup>
        </Styled.MainForm>
      </Styled.Form>
    </>
  );
};
