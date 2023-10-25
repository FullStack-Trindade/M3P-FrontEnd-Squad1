import * as Styled from "./FormPaciente.style";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { InputComponent } from "../Form/InputComponent/InputComponent";
import { SelectComponent } from "../Form/SelectComponent/SelectComponent";

import { Switch, Spin } from "antd";

import { CEPService } from "../../Service/User.CEP";
import { PacienteService } from "../../Service/Paciente.service";
import { UsuarioService } from "../../Service/UserPatient.service";

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

  // visto até aqui

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const createPaciente = (pacienteData) => {
    console.log("Dados do paciente:", pacienteData);
    // PacienteService.CreatePaciente(pacienteData)
    //   .then(response => {
    //     console.log('Paciente cadastrado com sucesso:', response);
    //     reset();
    //   })
    //   .catch(error => {
    //     console.error('Erro ao cadastrar paciente:', error);
    //   });
    alert("lógica para criação de paciente");
  };

  const deletePaciente = (pacienteData) => {
    console.log("Dados do paciente:", pacienteData);
    // PacienteService.DeletePaciente(pacienteData.nome)
    //   .then(response => {
    //     console.log('Paciente deletado com sucesso:', response);
    //     reset();
    //   })
    //   .catch(error => {
    //     console.error('Erro ao deletar paciente:', error);
    //   });
    alert("lógica para deletar paciente");
  };

  const buscaCEP = async () => {
    CEPService.Get(watch("cep")).then((response) => {
      setValue("city", response.localidade);
      setValue("state", response.uf);
      setValue("neighborhood", response.bairro);
    });
  };

  const submitForm = async (pacienteData) => {
    try {

      //implantar lógica de que se o usuário já existe no bd fazer update
      const postUsuarioDb = {
        name: pacienteData.name,
        gender: pacienteData.gender,
        cpf: pacienteData.cpf,
        email: pacienteData.email,
        password: pacienteData.cpf,
        phone: pacienteData.phone,
        id_type: "3",
      };
    
                  const usuarioId = await UsuarioService.CadastrarUsuarioPaciente(
        postUsuarioDb
      );
     
      if (usuarioId !== null) {
        const postPacientDb = {
          birth: pacienteData.birth,
          idUser: usuarioId,
          maritalStatus: pacienteData.maritalStatus,
          rg: pacienteData.rg,
          orgaoExpedidor: pacienteData.orgaoExpedidor,
          birthplace: pacienteData.birthplace,
          emergencyContact: pacienteData.emergencyContact,
          alergiesList: pacienteData.alergiesList,
          specificCares: pacienteData.specificCares,
          healthInsurance: pacienteData.healthInsurance,
          insuranceNumber: pacienteData.insuranceNumber,
          insuranceVality: pacienteData.insuranceVality,
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
                  PacienteService.CadastrarPaciente(postPacientDb);
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário e paciente:", error);
       }
  };

  useEffect(() => {
    const cepPaciente = watch("cep") || "";
    if (cepPaciente.length > 7) {
      buscaCEP(cepPaciente);
    }
  }, [watch("cep")]);

  //const [isLoading, setIsLoading] = useState();

  return (
    <Styled.Form onSubmit={handleSubmit(submitForm)}>
      <Styled.Header>
        <Styled.Title>Identificação</Styled.Title>

        <Styled.LabelSwitch>Editar</Styled.LabelSwitch>

        <Styled.SwitchBtn>
          <Switch />
        </Styled.SwitchBtn>

        <Styled.ButtonDel
          $width={"10%"}
          onClick={deletePaciente}
          $active={!errors.email && !errors.password}
          type="button"
          disabled={errors.email || errors.password}
        >
          Deletar
        </Styled.ButtonDel>

        <Styled.Button
          onClick={() => {
            /*setIsLoading(true)}*/
          }}
          $width={"10%"}
          onSubmit={createPaciente}
          $active={!errors.email && !errors.password}
          type="submit"
          disabled={errors.email || errors.password}
        >
          {/*isLoading ? <Spin /> : "Salvar"*/}
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
            error={errors.nome}
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
            error={errors.genero}
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
            id="estadoCivil"
            name="estadoCivil"
            label={"Estado Civil"}
            options={estadoCivil}
            register={{
              ...register("maritalStatus", {
                required: true,
              }),
            }}
            error={errors.estadoCivil}
          />
        </Styled.InputGroup>

        <Styled.InputGroup>
          <InputComponent
            $width={"100%"}
            id="tel"
            type="text"
            placeholder="Telefone no formato (99) 9 9999-99999"
            name="tel"
            label="Telefone"
            register={{
              ...register("phone", {
                required: false,
              }),
            }}
            error={errors.tel}
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
            id="natural"
            type="string"
            placeholder="Naturalidade"
            name="natural"
            label="Naturalidade"
            register={{
              ...register("birthplace", {
                required: true,
                minLenght: 8,
                maxLenght: 64,
              }),
            }}
            error={errors.natural}
          />
        </Styled.InputGroup>
        <Styled.InputGroup>
          <InputComponent
            $width={"100%"}
            id="emergencia"
            type="text"
            placeholder="Digite o telefone no formato (99) 9 9999-99999"
            name="emergencia"
            label="Contato de Emergência"
            register={{
              ...register("emergencyContact", {
                required: true,
              }),
            }}
            error={errors.tel}
          />

          <InputComponent
            $width={"100%"}
            id="alergias"
            type="text"
            placeholder="Possui alergias? Cite quais."
            name="alergias"
            label="Alergias"
            register={{
              ...register("alergiesList", {
                required: false,
              }),
            }}
            error={errors.email}
          />

          <InputComponent
            $width={"100%"}
            id="cuidados"
            type="string"
            placeholder="Digite os cuidados específicos"
            name="cuidados"
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
            id="convenio"
            type="string"
            placeholder="Informe seu convênio"
            label="Convênio"
            name="convenio"
            register={{
              ...register("healthInsurance", {
                required: false,
              }),
            }}
            error={errors.convenio}
          />

          <InputComponent
            $width={"100%"}
            id="NCart"
            type="number"
            placeholder="Digite o número da carteira"
            name="NCart"
            label="Número do Convênio"
            register={{
              ...register("insuranceNumber", {
                required: false,
              }),
            }}
            error={errors.NCart}
          />

          <InputComponent
            $width={"100%"}
            id="validade"
            type="date"
            placeholder="Validade"
            name="validade"
            label="Validade"
            register={{
              ...register("insuranceVality", {
                required: false,
              })
            }}
            error={errors.validade}
          />
        </Styled.InputGroup>

        <Styled.Header>
          <Styled.Title>Dados do Endereço</Styled.Title>
        </Styled.Header>

        <Styled.InputGroup>
          <InputComponent
            $width={"100%"}
            id="cep"
            type="text"
            placeholder="Informe o CEP"
            name="cep"
            label="CEP"
            register={{
              ...register("cep"),
            }}
            error={errors.cep}
          />

          <InputComponent
            $width={"100%"}
            id="cidade"
            type="string"
            placeholder="Digite a Cidade"
            name="cidade"
            label="Cidade"
            register={{
              ...register("city", {
                required: false,
              }),
            }}
            error={errors.cidade}
          />

          <InputComponent
            $width={"100%"}
            id="uf"
            type="string"
            placeholder="Estado"
            name="uf"
            label="Estado"
            register={{
              ...register("state", {
                required: false,
              }),
            }}
            error={errors.uf}
          />
        </Styled.InputGroup>

        <Styled.InputGroup>
          <InputComponent
            $width={"500%"}
            id="logradouro"
            type="string"
            placeholder="Informe seu endereço"
            name="rua"
            label="Endereço"
            register={{
              ...register("street", {
                required: false,
              }),
            }}
            error={errors.rua}
          />

          <InputComponent
            $width={"100%"}
            id="numRua"
            type="number"
            placeholder="Número"
            label="Número"
            name="numRua"
            register={{
              ...register("number", {
                required: false,
              }),
            }}
            error={errors.numRua}
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
            id="bairro"
            type="string"
            placeholder="Digite o seu bairro"
            name="bairro"
            label="Bairro"
            /* defaultValue={endereco.bairro || ''} */
            register={{
              ...register("neighborhood", {
                required: false,
              }),
            }}
            error={errors.bairro}
          />

          <InputComponent
            $width={"100%"}
            id="refEnd"
            type="string"
            placeholder="Referência"
            name="refEnd"
            label="Ponto de Referência"
            register={{
              ...register("reference", {
                required: false,
              }),
            }}
            error={errors.refEnd}
          />
        </Styled.InputGroup>
      </Styled.MainForm>
    </Styled.Form>
  );
};
