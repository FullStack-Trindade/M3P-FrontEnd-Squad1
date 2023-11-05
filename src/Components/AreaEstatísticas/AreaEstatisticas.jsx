import CardEstatistica from "../CardEstatistica/CardEstatistica";
import CardEstatisticaADM from "../CardEstatisticaADM/CardEstatisticaADM";
import * as Styled from "./AreaEstatisticas.style";
import React, { useState, useEffect } from "react";
import { ImUsers, ImDroplet } from "react-icons/im";
import { FaLaptopMedical, FaSyringe, FaRunning, FaUtensils } from "react-icons/fa";

import { UserService } from "../../Service/User.service";
import { PatientService } from "../../Service/Patient.service";
import { ExamService } from "../../Service/Exam.service";
import { AppointmentService } from "../../Service/Appointment.service";
import { InputUserSearchAtHome } from '../../Components/InputUserSearchAtHome/InputUserSearchAtHome';
import { InputPatientSearchAtHome } from './../InputPatientSearchAtHome/InputPatientSearchAtHome';

import UserAddBtn from './../UserAddBtn/UserAddBtn';


function EstatisticasSistema() {
  const [users, setUsers] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [exames, setExames] = useState([]);
  // 2 - criar conforme finalizar o backend

  useEffect(() => {
    const getUsers = async () => {
      UserService.Get().then((response) => {
        setUsers(response);
      });
    };

    const getPacientes = async () => {
      PatientService.Get().then((response) => {
        setPacientes(response);
      });
    };

    const getConsultas = async () => {
      AppointmentService.Get().then((response) => {
        setConsultas(response);
      });
    };

    const getExames = async () => {
      ExamService.Get().then((response) => {
        setExames(response);

        //3- criar conforme finalizar o backend
      });
    };

    getUsers();
    getPacientes();
    getConsultas();
    getExames();

    // 4- incluir conforme finalizar o backend
  }, []);
  const totalPacientes = () => {
    return pacientes.length ? pacientes.length : 0;
  };

  const totalConsultas = () => {
    return consultas.length ? consultas.length : 0;
  };

  const totalExames = () => {
    return exames.length ? exames.length : 0;

    // 6- incluir conforme finalizar o backend
  };

  const dataCard = [
    {
      id: "1",
      icone: <ImUsers />,
      resultado: totalPacientes(),
      legenda: "Pacientes",
    },
    {
      id: "2",
      icone: <FaLaptopMedical />,
      resultado: totalConsultas(),
      legenda: "Consultas",
    },
    {
      id: "3",
      icone: <ImDroplet />,
      resultado: totalExames(),
      legenda: "Exames",
    },
    {
      id: "4",
      icone: <FaSyringe />,
      resultado: 10,
      legenda: "Medicamentos",
    },
    {
      id: "5",
      icone: <FaUtensils />,
      resultado: 20,
      legenda: "Dietas",
    },
    {
      id: "6",
      icone: <FaRunning />,
      resultado: 30,
      legenda: "Exercícios",
    },

    // 1 - Adicionar mais cards conforme foram sendo finalizados o backend
  ];

  const dataCardADM = [
    {
      id: "1",
      icone: <ImUsers />,
      resultado: users.length,
      legenda: "Usuários",
    },
  ];

  return (
    <>
      <Styled.ContainerEstatisticasADM>
        <h2>Estatísticas do Sistema do Administrador</h2>
        <UserAddBtn Text="Configurações" To="./config" />
        <Styled.ContainerCardEstatisticas>
          {dataCardADM.map((estatistica) => (
            <CardEstatisticaADM
              key={estatistica.id}
              dataCardADM={estatistica}
            />
          ))}
          <InputUserSearchAtHome />
        </Styled.ContainerCardEstatisticas>
      </Styled.ContainerEstatisticasADM>

      <Styled.ContainerEstatisticas>
        <h2>Estatísticas do Sistema</h2>
        <Styled.ContainerCardEstatisticas>
          {dataCard.map((estatistica) => (
            <CardEstatistica key={estatistica.id} dataCard={estatistica} />
          ))}
          <InputPatientSearchAtHome />
        </Styled.ContainerCardEstatisticas>
      </Styled.ContainerEstatisticas>
    </>
  );
}

export default EstatisticasSistema;
