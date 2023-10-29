import * as Styled from "./FormPaciente.style";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { InputComponent } from "../Form/InputComponent/InputComponent";
import { SelectComponent } from "../Form/SelectComponent/SelectComponent";

import { Switch, Spin } from "antd";

import { CEPService } from "../../Service/User.CEP";
import { PacienteService } from "../../Service/Paciente.service";
import { UserService } from "../../Service/User.service";

export const FormPaciente = () => {
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

  const submitForm = async (pacienteData) => {
    setIsLoading(true);

    let newUser = null;
    let newPatient = null;
    let newInsuranceVality = null;

    //Gambiarra para arrumar o problema do valitynumber

    if (pacienteData.insuranceVality === "") {
      newInsuranceVality = "12-12-9999";
    } else {
      newInsuranceVality = pacienteData.insuranceVality;
    }

    try {
      const searchedUser = {
        cpf: pacienteData.cpf,
        email: pacienteData.email,
      };
      const userExist = await UserService.SearchByCpfEmail(searchedUser);

      console.log(userExist);

      if (userExist === null) {
        const postUsuarioDb = {
          name: pacienteData.name,
          gender: pacienteData.gender,
          cpf: pacienteData.cpf,
          email: pacienteData.email,
          password: pacienteData.cpf,
          phone: pacienteData.phone,
          id_type: "3",
        };

        newUser = await UserService.Create(postUsuarioDb);

        const postPacientDb = {
          birth: pacienteData.birth,
          idUser: newUser.id,
          maritalStatus: pacienteData.maritalStatus,
          rg: pacienteData.rg,
          orgaoExpedidor: pacienteData.orgaoExpedidor,
          birthplace: pacienteData.birthplace,
          emergencyContact: pacienteData.emergencyContact,
          alergiesList: pacienteData.alergiesList,
          specificCares: pacienteData.specificCares,
          healthInsurance: pacienteData.healthInsurance,
          insuranceNumber: pacienteData.insuranceNumber,
          insuranceVality: newInsuranceVality,
          //gambi
          adress: {
            cep: pacienteData.cep,
            city: pacienteData.city,
            state: pacienteData.state,
            street: pacienteData.street,
            number: pacienteData.number,
            complement: pacienteData.complement,
            neighborhood: pacienteData.neighborhood,
            reference: pacienteData.reference,
          },
        };

        newPatient = await PacienteService.Create(postPacientDb);
        alert("Usuário/ Paciente cadastrado com sucesso");
        setIsSubmitSuccessful(true);
        reset();
        return;
      }
      if (userExist.id_type !== 3) {
        const patientExist = await PacienteService.SearchByUserId(userExist.id);
        console.log(patientExist);
        if (patientExist === null) {
          const postPacientDb = {
            birth: pacienteData.birth,
            idUser: userExist.id,
            maritalStatus: pacienteData.maritalStatus,
            rg: pacienteData.rg,
            orgaoExpedidor: pacienteData.orgaoExpedidor,
            birthplace: pacienteData.birthplace,
            emergencyContact: pacienteData.emergencyContact,
            alergiesList: pacienteData.alergiesList,
            specificCares: pacienteData.specificCares,
            healthInsurance: pacienteData.healthInsurance,
            insuranceNumber: pacienteData.insuranceNumber,
            insuranceVality: newInsuranceVality,
            //gambi
            adress: {
              cep: pacienteData.cep,
              city: pacienteData.city,
              state: pacienteData.state,
              street: pacienteData.street,
              number: pacienteData.number,
              complement: pacienteData.complement,
              neighborhood: pacienteData.neighborhood,
              reference: pacienteData.reference,
            },
          };

          newPatient = await PacienteService.Create(postPacientDb);

          setIsSubmitSuccessful(true);
          alert(
            `Cadastro de Paciente para o usuário ${userExist.id} realizado com sucesso.`
          );
          reset();
          return;
        } else {
          console.log(
            "foi encontrado um cadastro de paciente vinculado ao cpf ou email informado, por isso não pode ser cadastrado"
          );
          alert(
            "Esse usuário já possui um cadastro de paciente. Cadastro não realizado."
          );
        }
      } else {
        console.log(
          "foi encontrado usuario pelo email ou cpf, por isso não pode ser cadastrado"
        );
        alert(
          "Não é possível cadastrar esse usuário/ paciente. Verifique com o administrador"
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Erro ao cadastrar usuário e paciente:", error);
      console.error("Detalhes do erro:", error.message);
      console.error("Stack trace:", error.stack);
    }
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
        <Styled.Title>Identificação</Styled.Title>

        <Styled.LabelSwitch>Editar</Styled.LabelSwitch>

        <Styled.SwitchBtn>
          <Switch disabled={true} />
        </Styled.SwitchBtn>

        <Styled.ButtonDel
          $width={"10%"}
          onClick={deletePaciente}
          $active={!errors.email && !errors.password}
          type="button"
          disabled={true}
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
          disabled={errors.email || errors.password}
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
            register={{
              ...register("cep",{required: true,}),
              
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
