import * as Styled from "./FormUsuario.style";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { InputComponent } from "../FormUsuario/InputComponent/InputComponent";
import { UserService } from "../../Service/User.service";
import { Switch, Spin } from "antd";

import { SelectComponent } from "../SelectComponent/SelectComponent";

export const FormUsuario = () => {

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos do CPF
  
    if (cpf.length !== 11 ||
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999") {
      return false;
    }
  
    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(9))) {
      return false;
    }
  
    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(10))) {
      return false;
    }
  
    return true; // CPF válido
  }
  
  const genders = [
    {
      id: 1,
      value: "MASCULINO",
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
      label: "NAO_INFORMADO",
    },
  ];

  const tipo = [
    {
      id: 1,
      value: "1",
      label: "Médico",
    },

    {
      id: 0,
      value: "0",
      label: "Administrador",
    },

    {
      id: 2,
      value: "2",
      label: "Enfermeiro",
    },
  ];

  const onSubmitForm = (data) => {
    const cpfValue = data.cpf;
    
    if (validarCPF(cpfValue)) {

      createUser(data); // CPF válido, continua com o envio do formulário
    } else {
      setValue("cpf", "", { shouldValidate: true }); // Limpa e seta um erro no campo CPF
      alert("CPF inválido. Por favor, insira um CPF válido.");
    }
  };
  
 

  const createUser = (UserData) => {
    UserService.Create(UserData)
      .then((response) => {        
        alert("Usuário cadastrado com sucesso:");
        reset();
      })
      .catch((error) => {
        console.error("Erro ao cadastrar usuário:", error);
      });
  };

  const deleteUser = (userData) => {
    UserService.DeleteUser(userData.nome)
      .then((response) => {
        console.log("Usuário deletado com sucesso:", response);
        reset();
      })
      .catch((error) => {
        console.error("Erro ao deletar usuário:", error);
      });
  };

  const submitForm = async (userData) => {
    const usuario = await UserService.CreateUser(userData);

    if (!usuario) {
      alert("Novo Usuário Cadastrado");
      reset();
    } else {
      alert("Usuário não cadastrado");
    }
  };



  const [isLoading, setIsLoading] = useState();

  return (
    <Styled.Form onSubmit={handleSubmit(onSubmitForm)}>
      <Styled.Header>
        <Styled.Title>Identificação</Styled.Title>

        <Styled.LabelSwitch>Editar</Styled.LabelSwitch>

        <Styled.SwitchBtn>
          <Switch />
        </Styled.SwitchBtn>

        <Styled.ButtonDel
          $width={"10%"}
          onClick={deleteUser}
          $active={!errors.email && !errors.password}
          type="button"
          disabled={errors.email || errors.password}
        >
          Deletar
        </Styled.ButtonDel>

        <Styled.Button
          onClick={() => setIsLoading(true)}
          $width={"10%"}
          onSubmit={createUser}
          $active={!errors.email && !errors.password}
          type="submit"
          disabled={errors.email || errors.password}
        >
          {isLoading ? <Spin /> : "Salvar"}
        </Styled.Button>
      </Styled.Header>

      <Styled.MainForm $width={"100%"}>
        <Styled.InputGroup>
          <InputComponent
            $width={"100%"}
            id="name"
            type="string"
            placeholder="Digite seu Nome"
            label="Nome Completo"
            name="name"
            register={{
              ...register("name", {
                required: true,
                minLength: 8,
                maxLength: 64,
              }),
            }}
            error={errors.name}
          />

          <SelectComponent
            $width={"20%"}
            id="gender"
            name="gender"
            label={"Gênero"}
            options={genders}
            register={{
              ...register("gender", {
                required: true,
              }),
            }}
            error={errors.gender}
          />
        </Styled.InputGroup>

          <Styled.InputGroup>
            <InputComponent
            $width={"100%"}
            id="cpf"
            type="text"
            name="cpf"
            placeholder="000.000.000-00"
            label="CPF"
            register={{
              ...register("cpf", {
                required: true,
                minLength: 11,
                maxLength: 14, // CPF tem exatamente 11 dígitos
              }),
            }}
            error={errors.cpf}
          />

          <InputComponent
            $width={"100%"}
            id="phone"
            type="text"
            placeholder="(99) 9 9999-99999"
            name="phone"
            label="Telefone"
            register={{
              ...register("phone", {
                required: true,
                pattern: /^\(\d{2}\) \d \d{4}-\d{5}$/,
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
        </Styled.InputGroup>

        <Styled.InputGroup>
          <InputComponent
            $width={"60%"}
            id="password"
            type="password"
            placeholder="Digite a sua senha"
            name="password"
            label="Senha"
            register={{
              ...register("password", {
                required: true,
              }),
            }}
            error={errors.password}
          />

          <SelectComponent
            $width={"20%"}
            id="id_type"
            name="id_type"
            label={"Tipo"}
            options={tipo}
            register={{
              ...register("id_type", {
                required: true,
              }),
            }}
            error={errors.id_type}
          />
        </Styled.InputGroup>

        
      </Styled.MainForm>
    </Styled.Form>
  );
};
