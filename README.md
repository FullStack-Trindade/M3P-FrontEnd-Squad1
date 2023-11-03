<div align="center">

![code](https://img.shields.io/badge/Code-JavaScript-F7DF1E.svg)
[![made-with-react](https://img.shields.io/badge/Made%20with-React%20v18.2.0-087EA4.svg)](https://react.dev/)
[![made-with-vite](https://img.shields.io/badge/Made%20with-Vite%204.4.5-747BFF.svg)](https://vitejs.dev/)
[![made-with-styled-components](https://img.shields.io/badge/Made%20with-Styled%20Components%205.3.11-BF4F74.svg)](https://ant.design/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![GitHub stars](https://img.shields.io/github/stars/FullStack-Trindade/M3P-FrontEnd-Squad1.svg?style=social&label=Star&maxAge=2592000)](https://github.com/FullStack-Trindade/M3P-FrontEnd-Squad1/watchers)
[![GitHub watchers](https://img.shields.io/github/watchers/FullStack-Trindade/M3P-FrontEnd-Squad1.svg?style=social&label=Watch&maxAge=2592000)](https://github.com/FullStack-Trindade/M3P-FrontEnd-Squad1/watchers)
[![GitHub forks](https://img.shields.io/github/forks/FullStack-Trindade/M3P-FrontEnd-Squad1.svg?style=social&label=Fork&maxAge=2592000)](https://github.com/FullStack-Trindade/M3P-FrontEnd-Squad1/forks)

</div>
<br>



![SYSTEMCARE](public/FIGURA_MOCKUP.png) Inserir imagem do mockup

<p align="justify">
<b>System Care</b> é um <i>software</i> para gestão de inventário médico no formato <i>white label</i> da empresa fictícia LABMedicine LTDA, líder no segmento tecnológico para gestão hospitalar. Essa aplicação foi criada como projeto de conclusão do Curso de Capacitação FullStack oferecido pelo Lab365 / Senai - SC.
</p>
<br>

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando [React v18.x](https://react.dev/) e as seguintes ferramentas foram usadas durante a sua construção:

- [Ant Design](https://ant.design/) - biblioteca UI para React que fornece um conjunto de componentes para construção de interfaces interativas ;
- [Day.js](https://day.js.org/) - biblioteca JavaScript que interpreta, valida, manipula e mostra datas e horas com API compatível com Moment.js ;
- [Font Awesome](https://fontawesome.com/) - biblioteca e *toolkit* de ícones ;
- [prop-types](https://www.npmjs.com/package/prop-types) - pacote que permite documentar os tipos de propriedades repassadas para os componentes ;
- [react-dom](https://www.npmjs.com/package/react-dom) - pacote que serve como ponto de entrada para a DOM e re-renderizadores de servidor para React ;
- [react-hook-form](https://react-hook-form.com/) - biblioteca que permite administrar e validar formulários em React ;
- [react-icons](https://www.npmjs.com/package/react-icons) - pacote que contém grande coletânea de ícones ;
- [react-router-dom](https://reactrouter.com/en/main) - pacote que contém pontos de ligação para utilização de React Router em aplicações *web* ;
- [styled-components](https://styled-components.com/) - biblioteca que permite escrever CSS em JavaScript para estilizar os componentes ;
- [ViaCEP API](https://viacep.com.br/) - REST API que permite obter um determinado endereço a partir do Código de Endereçamento Postal (CEP) ;
- [Vite](https://vitejs.dev/) - servidor de desenvolvimento local para modelos de projeto React e Vue ;
- [VSCode](https://code.visualstudio.com/) - editor de código-fonte para construção e *debugging* de aplicações *web* e *cloud*.
- [Yup](https://www.npmjs.com/package/yup) - contrutor de *schema* JavaScript para análise e validação de valor.

<br>

## 💻 Instalação

<p align="justify">
É interessante que tenha <a href="https://git-scm.com/">Git</a> ou outro <i>software</i> de controle de versionamento instalado em seu equipamento, assim como um editor de código como o <a href="https://code.visualstudio.com/">VSCode</a>.
<br><br>
Antes de iniciar a aplicação, execute a parte do projeto correspondente ao <a href='https://github.com/FullStack-Trindade/M3P-BackEnd-Squad1'><i>back-end</i></a>. Esse é um passo importante para o bom funcionamento da aplicação.
</p>
<br>

Siga os passos abaixo para iniciar o projeto em modo de desenvolvimento:

1. Clone o repositório no terminal / cmd ;

```
    $ git clone https://github.com/FullStack-Trindade/M3P-FrontEnd-Squad1.git
```

2. Navegue até o diretório do projeto ;

```
    $ cd M3P-FrontEnd-Squad1
```

3. Instale os pacotes e dependências do projeto ;

```
    $ npm install
```

4. Execute a aplicação em modo de desenvolvimento ;

```
    $ npm run dev
```

5. As mensagens seguintes devem aparecer após ``npm run dev`` :

```
    VITE v4.4.3

    Local:   http://localhost:5173/
```

Pronto! Faça bom proveito!

<br>

## 🗂️ Estrutura

```

├───public 
└───src
    ├───Assets
    ├───Components
    │   ├───AreaEstatísticas
    │   ├───CardEstatistica
    │   ├───CardEstatisticaADM
    │   ├───CardMedicalRecord
    │   ├───CardPaciente
    │   ├───CardUser
    │   ├───Form
    │   │   └───InputComponent
    │   ├───FormAppointment
    │   ├───FormExame
    │   ├───FormPaciente
    │   │   └───InputComponent
    │   ├───FormUsuario
    │   │   └───InputComponent
    │   ├───InputPatientSearchAtHome
    │   ├───InputSearch
    │   ├───InputSearchAppointment
    │   ├───InputSearchExame
    │   ├───InputSearchMedicalRecord
    │   ├───InputSearchPaciente
    │   ├───InputSearchUser
    │   ├───InputUserSearchAtHome
    │   ├───LoginForm
    │   ├───Menu
    │   │   ├───MenuComponent
    │   │   ├───MenuItem
    │   │   └───MenuItemFechado
    │   ├───SelectComponent
    │   └───ToolBar
    ├───Context
    ├───Layout
    ├───Pages
    │   ├───AppointmentRegister
    │   ├───CadastroExame
    │   ├───CadastroPaciente
    │   ├───CadastroUsuario
    │   ├───HomePage
    │   ├───LoginPage
    │   └───MedicalRecords
    └───Service
```

<br>

## ⚙️ Funcionalidades

- Usuários previamente cadastrados podem acessar o sistema que permite:

  - acesso a estatísticas e cartões informativos ;
  - acesso ao formulário para cadastro de usuários (restrito ao administrador) ;
  - acesso ao formulário para cadastro de pacientes ;
  - acesso ao formulário para cadastro de consultas ;
  - acesso ao formulário para cadastro de dietas ;
  - acesso ao formulário para cadastro de exames ;
  - acesso ao formulário para cadastro de exercícios, e ;
  - acesso ao formulário para cadastro de medicamentos ;

<br>

## ✏️ ToDo

- [X] Página para entrada do usuário no sistema
- [X] Barra de ferramentas com título da página e informações do usuário
- [X] Menu lateral para navegação entre páginas
- [X] Página de início com dados estatísticos e cartões informativos
- [X] Página de cadastro do usuários
- [X] Página de cadastro do pacientes
- [X] Página de cadastro da consultas
- [X] Página de cadastro do dietas
- [X] Página de cadastro do exames
- [X] Página de cadastro do exercícios
- [X] Página de cadastro do medicamentos
- [X] Página de listagem dos prontuários dos pacientes
- [X] Página de prontuário do paciente
- [X] Página de personalização de layout
- [ ] Página para recuperação de senha esquecida
- [ ] Página de configurações
- [ ] Calendário com as consultas e exames agendados na página de início
- [ ] Página de listagem das consultas
- [ ] Página de listagem dos exames
- [ ] Página não encontrada personalizada

<br>

## ✍🏻 Autor

Feito por 🔥Furious Five🔥 (Squad 1), composto por [Beatriz Christie](https://github.com/biachristie),  [Daniel Simoni](https://github.com/DaniSimoni), [Gabriel Pacheco](https://github.com/gabrieldelpacheco), [Reinaldo Porto](https://github.com/portexrp) e [Rodrigo Pieritz](https://github.com/rodrigopieritz) (P.O)🖐🏻

<br>

## 📌 Licença

Este código está sob a Licença MIT, cujo texto pode ser lido em [MIT License](https://github.com/FullStack-Trindade/M3P-FrontEnd-Squad1/blob/main/LICENSE.md).