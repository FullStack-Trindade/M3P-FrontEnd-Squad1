import * as Styled from "./FormPaciente.style";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { InputComponent } from "../Form/InputComponent/InputComponent";
import { SelectComponent } from "../Form/SelectComponent/SelectComponent";

import { Switch, Spin } from "antd";

import { CEPService } from "../../Service/User.CEP";
import { PacienteService } from "../../Service/Paciente.service";
import { UserService } from "../../Service/User.service";

export const FormPaciente = ({ id }) => {
  const genders = [
    {
      id: 1,
      value: "MACULINO",
      label: "MASCULINO",
    },

    {
      id: 2,
      value: "FEMININO",
      label: "FEMININO",
    },

    {
      id: 3,
      value: "NAO_INFORMADO",
      label: "NÃO INFORMADO",
    },
  ];

  const estadoCivil = [
    {
      id: 1,
      value: "SOLTEIRO(A)",
      label: "SOLTEIRO(A)",
    },

    {
      id: 2,
      value: "CASADO(A)",
      label: "CASADO(A)",
    },

    {
      id: 3,
      value: "DIVORCIADO(A)",
      label: "DIVORCIADO(A)",
    },

    {
      id: 4,
      value: "VIUVO(A)",
      label: "VIUVO(A)",
    },
    {
      id: 5,
      value: "SEPARADO(A)",
      label: "SEPARADO(A)",
    },
    {
      id: 6,
      value: "UNIAO_ESTAVEL",
      label: "UNIÃO ESTÁVEL)",
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idUser, setIdUser] = useState(false);

  //Estados dos botões
  const [formMode, setFormMode] = useState(null);
  const [editButtonDisabled, setEditButtonDisabled] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
  const [formInputsDisabled, setformInputsDisabled] = useState(false);
  const [specialFormInputsDisabled, setSpecialFormInputsDisabled] = useState(false);

  //se vier com ID busca os dados do paciente

  useEffect(() => {
    if (id) {
      buscarDadosPacienteCadastrado(id);
      setFormMode("read");
    } else {
      setFormMode("register");
    }
  }, []);

  useEffect(() => {
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

  const buscarDadosPacienteCadastrado = (id) => {
    PacienteService.Show(id).then((response) => {
      if (response) {
        setValue("birth", response.birth);
        setValue("idUser", response.idUser);
        setValue("maritalStatus", response.maritalStatus);
        setValue("rg", response.rg);
        setValue("orgaoExpedidor", response.orgaoExpedidor);
        setValue("birthplace", response.birthplace);
        setValue("emergencyContact", response.emergencyContact);
        setValue("alergiesList", response.alergiesList);
        setValue("specificCares", response.specificCares);
        setValue("healthInsurance", response.healthInsurance);
        setValue("insuranceNumber", response.insuranceNumber);
        setValue("insuranceVality", response.insuranceVality);
        setValue("cep", response.adress.cep);
        setValue("city", response.adress.city);
        setValue("state", response.adress.state);
        setValue("street", response.adress.street);
        setValue("number", response.adress.number);
        setValue("complement", response.adress.complement);
        setValue("neighborhood", response.adress.neighborhood);
        setIdUser(response.idUser);
      } else {
        alert(
          "Dados do paciente não podem ser carregados. Tente novamente mais tarde."
        );
      }
    });
  };

  //quando os dados do paciene são alterados (idUser), então busca os dados do usuário
  useEffect(() => {
    if (idUser) {
      buscarDadosUsuarioCadastrado(idUser);
    } else {
    }
  }, [idUser]);

  const buscarDadosUsuarioCadastrado = (idUser) => {
    UserService.Get().then((response) => {
      if (response) {
        const filteredUser = response.filter((users) =>
          String(users.id).includes(idUser)
        );
        setValue("name", filteredUser[0].name);
        setValue("gender", filteredUser[0].gender);
        setValue("cpf", filteredUser[0].cpf);
        setValue("email", filteredUser[0].email);
        setValue("phone", filteredUser[0].phone);
      }
    });
  };

  ////////////////////////////////
  const createPaciente = () => {
    console.log("ainda não será implantada");
  };

  const deletePaciente = () => {
    console.log("ainda não será implantada");
  };

  const buscaCEP = async () => {
    CEPService.Get(watch("cep")).then((response) => {
      setValue("city", response.localidade);
      setValue("state", response.uf);
      setValue("neighborhood", response.bairro);
    });
  };

  const submitForm = async (data) => {
    setIsLoading(true);

    if (formMode == "edit") {
      alert("lógica de atualizar");
    } else {
      alert("lógica de cadsatrar");
    }

    // let newUser = null;
    // let newPatient = null;
    // let newInsuranceVality = null;

    // //Gambiarra para arrumar o problema do valitynumber

    // if (pacienteData.insuranceVality === "") {
    //   newInsuranceVality = "9999-12-12";
    // } else {
    //   newInsuranceVality = pacienteData.insuranceVality;
    // }

    // try {
    //   const searchedUser = {
    //     cpf: pacienteData.cpf,
    //     email: pacienteData.email,
    //   };
    //   const userExist = await UserService.SearchByCpfEmail(searchedUser);

    //   console.log(userExist);

    //   if (userExist === null) {
    //     const postUsuarioDb = {
    //       name: pacienteData.name,
    //       gender: pacienteData.gender,
    //       cpf: pacienteData.cpf,
    //       email: pacienteData.email,
    //       password: pacienteData.cpf,
    //       phone: pacienteData.phone,
    //       id_type: "3",
    //     };

    //     newUser = await UserService.Create(postUsuarioDb);

    //     const postPacientDb = {
    //       birth: pacienteData.birth,
    //       idUser: newUser.id,
    //       maritalStatus: pacienteData.maritalStatus,
    //       rg: pacienteData.rg,
    //       orgaoExpedidor: pacienteData.orgaoExpedidor,
    //       birthplace: pacienteData.birthplace,
    //       emergencyContact: pacienteData.emergencyContact,
    //       alergiesList: pacienteData.alergiesList,
    //       specificCares: pacienteData.specificCares,
    //       healthInsurance: pacienteData.healthInsurance,
    //       insuranceNumber: pacienteData.insuranceNumber,
    //       insuranceVality: newInsuranceVality,
    //       //gambi
    //       adress: {
    //         cep: pacienteData.cep,
    //         city: pacienteData.city,
    //         state: pacienteData.state,
    //         street: pacienteData.street,
    //         number: pacienteData.number,
    //         complement: pacienteData.complement,
    //         neighborhood: pacienteData.neighborhood,
    //         reference: pacienteData.reference,
    //       },
    //     };

    //     newPatient = await PacienteService.Create(postPacientDb);
    //     alert("Usuário/ Paciente cadastrado com sucesso");
    //     setIsSubmitSuccessful(true);
    //     reset();
    //     return;
    //   }
    //   if (userExist.id_type !== 3) {
    //     const patientExist = await PacienteService.SearchByUserId(userExist.id);
    //     console.log(patientExist);
    //     if (patientExist === null) {
    //       const postPacientDb = {
    //         birth: pacienteData.birth,
    //         idUser: userExist.id,
    //         maritalStatus: pacienteData.maritalStatus,
    //         rg: pacienteData.rg,
    //         orgaoExpedidor: pacienteData.orgaoExpedidor,
    //         birthplace: pacienteData.birthplace,
    //         emergencyContact: pacienteData.emergencyContact,
    //         alergiesList: pacienteData.alergiesList,
    //         specificCares: pacienteData.specificCares,
    //         healthInsurance: pacienteData.healthInsurance,
    //         insuranceNumber: pacienteData.insuranceNumber,
    //         insuranceVality: newInsuranceVality,
    //         //gambi
    //         adress: {
    //           cep: pacienteData.cep,
    //           city: pacienteData.city,
    //           state: pacienteData.state,
    //           street: pacienteData.street,
    //           number: pacienteData.number,
    //           complement: pacienteData.complement,
    //           neighborhood: pacienteData.neighborhood,
    //           reference: pacienteData.reference,
    //         },
    //       };

    //       newPatient = await PacienteService.Create(postPacientDb);

    //       setIsSubmitSuccessful(true);
    //       alert(
    //         `Cadastro de Paciente para o usuário ${userExist.id} realizado com sucesso.`
    //       );
    //       reset();
    //       return;
    //     } else {
    //       console.log(
    //         "foi encontrado um cadastro de paciente vinculado ao cpf ou email informado, por isso não pode ser cadastrado"
    //       );
    //       alert(
    //         "Esse usuário já possui um cadastro de paciente. Cadastro não realizado."
    //       );
    //     }
    //   } else {
    //     console.log(
    //       "foi encontrado usuario pelo email ou cpf, por isso não pode ser cadastrado"
    //     );
    //     alert(
    //       "Não é possível cadastrar esse usuário/ paciente. Verifique com o administrador"
    //     );
    //   }
    // } catch (error) {
    //   setIsLoading(false);
    //   console.error("Erro ao cadastrar usuário e paciente:", error);
    //   console.error("Detalhes do erro:", error.message);
    //   console.error("Stack trace:", error.stack);
    // }
  };

  useEffect(() => {
    const cepPaciente = watch("cep") || "";
    if (cepPaciente.length > 7) {
      buscaCEP(cepPaciente);
    }
  }, [watch("cep")]);

  return (
    <Styled.Form onSubmit={handleSubmit(submitForm)}>
      <Styled.Header>
        <Styled.Title>Identificação {formMode}</Styled.Title>

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
          onClick={deletePaciente}
          $active={!errors.email && !errors.password}
          type="button"
          disabled={deleteButtonDisabled}
        >
          Deletar
        </Styled.ButtonDel>

        <Styled.Button
          onClick={() => {
            handleSubmit(submitForm)();
          }}
          $width={"10%"}
          onSubmit={createPaciente}
          $active={!errors.email && !errors.password}
          type="submit"
          disabled={errors.email || errors.password || saveButtonDisabled}
        >
          {isSubmitSuccessful ? "Salvo!" : isLoading ? <Spin /> : "Salvar"}
        </Styled.Button>
      </Styled.Header>

      <Styled.MainForm $width={"100%"}>
        <Styled.InputGroup>
          <InputComponent
            $width={"100%"}
            id="nome"
            type="string"
            placeholder="Digite seu Nome"
            label="Nome Completo"
            name="nome"
            disabled={formInputsDisabled}
            register={{
              ...register("name", {
                required: true,
                minLenght: 8,
                maxLenght: 64,
              }),
            }}
            error={errors.name}
          />

          <SelectComponent
            $width={"20%"}
            id="genero"
            name="genero"
            label={"Gênero"}
            options={genders}
            disabled={formInputsDisabled}
            register={{
              ...register("gender", {
                required: true,
              }),
            }}
            error={errors.gender}
          />

          <InputComponent
            $width={"10 %"}
            id="birth"
            type="date"
            name="birth"
            placeholder="Data Nascimento"
            label="Data Nascimento"
            disabled={formInputsDisabled}
            register={{
              ...register("birth", {
                required: true,
              }),
            }}
            error={errors.birth}
          />
        </Styled.InputGroup>

        <Styled.InputGroup>
          <InputComponent
            $width={"100%"}
            id="cpf"
            type="text"
            name="cpf"
            placeholder="Digite seu CPF"
            label="CPF"
            disabled={specialFormInputsDisabled}
            register={{
              ...register("cpf", {
                required: true,
              }),
            }}
            error={errors.cpf}
          />

          <InputComponent
            $width={"100%"}
            id="rg"
            type="text"
            name="rg"
            placeholder="Digite seu RG"
            label="RG"
            disabled={specialFormInputsDisabled}
            register={{
              ...register("rg", {
                required: true,
                maxLenght: 20,
              }),
            }}
            error={errors.rg}
          />

          <InputComponent
            $width={"100%"}
            id="orgaoExpedidor"
            type="text"
            name="orgaoExpedidor"
            placeholder="Órgão Expedidor"
            label="Órgão Expedidor"
            disabled={specialFormInputsDisabled}
            register={{
              ...register("orgaoExpedidor", {
                required: true,
                maxLenght: 20,
              }),
            }}
            error={errors.orgaoExpedidor}
          />

          <SelectComponent
            $width={"30%"}
            id="maritalStatus"
            name="maritalStatus"
            label={"Estado Civil"}
            options={estadoCivil}
            disabled={formInputsDisabled}
            register={{
              ...register("maritalStatus", {
                required: true,
              }),
            }}
            error={errors.maritalStatus}
          />
        </Styled.InputGroup>

        <Styled.InputGroup>
          <InputComponent
            $width={"100%"}
            id="phone"
            type="text"
            placeholder="Telefone no formato (99) 9 9999-99999"
            name="phone"
            label="Telefone"
            disabled={formInputsDisabled}
            register={{
              ...register("phone", {
                required: true,
              }),
            }}
            error={errors.phone}
          />

          <InputComponent
            $width={"100%"}
            id="email"
            type="email"
            placeholder="Digite o seu email"
            name="email"
            label="E-mail"
            disabled={specialFormInputsDisabled}
            register={{
              ...register("email", {
                required: true,
              }),
            }}
            error={errors.email}
          />

          <InputComponent
            $width={"100%"}
            id="birthplace"
            type="string"
            placeholder="Naturalidade"
            name="birthplace"
            label="Naturalidade"
            disabled={formInputsDisabled}
            register={{
              ...register("birthplace", {
                required: true,
                minLenght: 8,
                maxLenght: 64,
              }),
            }}
            error={errors.birthplace}
          />
        </Styled.InputGroup>
        <Styled.InputGroup>
          <InputComponent
            $width={"100%"}
            id="emergencyContact"
            type="text"
            placeholder="Digite o telefone no formato (99) 9 9999-99999"
            name="emergencyContact"
            label="Contato de Emergência"
            disabled={formInputsDisabled}
            register={{
              ...register("emergencyContact", {
                required: true,
              }),
            }}
            error={errors.emergencyContact}
          />

          <InputComponent
            $width={"100%"}
            id="alergiesList"
            type="text"
            placeholder="Possui alergias? Cite quais."
            name="alergiesList"
            label="Alergias"
            disabled={formInputsDisabled}
            register={{
              ...register("alergiesList", {
                required: false,
              }),
            }}
            error={errors.alergiesList}
          />

          <InputComponent
            $width={"100%"}
            id="specificCares"
            type="string"
            placeholder="Digite os cuidados específicos"
            name="specificCares"
            label="Cuidados Específicos"
            disabled={formInputsDisabled}
            register={{
              ...register("specificCares", {
                required: false,
              }),
            }}
            error={errors.natural}
          />
        </Styled.InputGroup>

        <Styled.Header>
          <Styled.Title>Convênio</Styled.Title>
        </Styled.Header>

        <Styled.InputGroup>
          <InputComponent
            $width={"100%"}
            id="healthInsurance"
            type="string"
            placeholder="Informe seu convênio"
            label="Convênio"
            name="healthInsurance"
            disabled={formInputsDisabled}
            register={{
              ...register("healthInsurance", {
                required: false,
              }),
            }}
            error={errors.healthInsurance}
          />

          <InputComponent
            $width={"100%"}
            id="insuranceNumber"
            type="number"
            placeholder="Digite o número da carteira"
            name="insuranceNumber"
            label="Número do Convênio"
            disabled={formInputsDisabled}
            register={{
              ...register("insuranceNumber", {
                required: false,
              }),
            }}
            error={errors.insuranceNumber}
          />

          <InputComponent
            $width={"100%"}
            id="insuranceVality"
            type="date"
            placeholder="Validade"
            name="insuranceVality"
            label="Validade"
            disabled={formInputsDisabled}
            register={{
              ...register("insuranceVality", {
                required: false,
              }),
            }}
            error={errors.insuranceVality}
          />
        </Styled.InputGroup>

        <Styled.Header>
          <Styled.Title>Dados do Endereço</Styled.Title>
        </Styled.Header>

        <Styled.InputGroup>
          <InputComponent
            $width={"100%"}
            id="cep"
            type="string"
            placeholder="Informe o CEP"
            name="cep"
            label="CEP"
            disabled={formInputsDisabled}
            register={{
              ...register("cep", { required: true }),
            }}
            error={errors.cep}
          />

          <InputComponent
            $width={"100%"}
            id="city"
            type="string"
            placeholder="Digite a Cidade"
            name="city"
            label="Cidade"
            disabled={formInputsDisabled}
            register={{
              ...register("city", {
                required: true,
              }),
            }}
            error={errors.city}
          />

          <InputComponent
            $width={"100%"}
            id="state"
            type="string"
            placeholder="Estado"
            name="state"
            label="Estado"
            disabled={formInputsDisabled}
            register={{
              ...register("state", {
                required: true,
              }),
            }}
            error={errors.state}
          />
        </Styled.InputGroup>

        <Styled.InputGroup>
          <InputComponent
            $width={"500%"}
            id="street"
            type="string"
            placeholder="Informe seu endereço"
            name="street"
            label="Endereço"
            disabled={formInputsDisabled}
            register={{
              ...register("street", {
                required: true,
              }),
            }}
            error={errors.street}
          />

          <InputComponent
            $width={"100%"}
            id="number"
            type="number"
            placeholder="Número"
            label="Número"
            name="number"
            disabled={formInputsDisabled}
            register={{
              ...register("number", {
                required: true,
              }),
            }}
            error={errors.number}
          />
        </Styled.InputGroup>

        <Styled.InputGroup>
          <InputComponent
            $width={"100%"}
            id="compl"
            type="string"
            placeholder="Complemento"
            name="compl"
            label="Complemento"
            disabled={formInputsDisabled}
            register={{
              ...register("complement", {
                required: false,
              }),
            }}
            error={errors.compl}
          />

          <InputComponent
            $width={"100%"}
            id="neighborhood"
            type="string"
            placeholder="Digite o seu bairro"
            name="neighborhood"
            label="Bairro"
            disabled={formInputsDisabled}
            register={{
              ...register("neighborhood", {
                required: true,
              }),
            }}
            error={errors.neighborhood}
          />

          <InputComponent
            $width={"100%"}
            id="reference"
            type="string"
            placeholder="Referência"
            name="reference"
            label="Ponto de Referência"
            disabled={formInputsDisabled}
            register={{
              ...register("reference", {
                required: false,
              }),
            }}
            error={errors.reference}
          />
        </Styled.InputGroup>
      </Styled.MainForm>
    </Styled.Form>
  );
};
