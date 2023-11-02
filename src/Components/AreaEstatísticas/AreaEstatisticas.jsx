import CardEstatistica from "../CardEstatistica/CardEstatistica";
import CardEstatisticaADM from "../CardEstatisticaADM/CardEstatisticaADM";
import * as Styled from "./AreaEstatisticas.style";
import React, { useState, useEffect } from "react";
import { ImUsers, ImDroplet } from "react-icons/im";
import { FaLaptopMedical } from "react-icons/fa";

import { UserService } from "../../Service/User.service";
import { PacienteService } from "../../Service/Paciente.service";
import { ExameService } from "../../Service/Exame.service";
import { AppointmentService } from "../../Service/Appointment.service";

function EstatisticasSistema() {
  const [users, setUsers] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [exames, setExames] = useState([]);
  
  useEffect(() => {
    const getUsers = async () => {
      UserService.Get().then((response) => {
        setUsers(response);
      });
    };

    const getPacientes = async () => {
      PacienteService.GetAll().then((response) => {
        setPacientes(response);
      });
    };

    const getConsultas = async () => {
      AppointmentService.Get().then((response) => {
        setConsultas(response);
      });
    };

    const getExames = async () => {
      ExameService.Get().then((response) => {
        setExames(response);
      });
    };

    getUsers();
    getPacientes();
    getConsultas();
    getExames();
  }, []);
  const totalPacientes = () => {
    return pacientes.length ? pacientes.length : 0;
  };

  const totalConsultas = () => {
    return consultas.length ? consultas.length : 0;
  };

  const totalExames = () => {
        return exames.listExams.length ? exames.listExams.length : 0;
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
      <Styled.ContainerEstatisticas>
        <h2>Estatísticas do Sistema do Administrador</h2>
        <Styled.ContainerCardEstatisticas>
          {dataCardADM.map((estatistica) => (
            <CardEstatisticaADM
              key={estatistica.id}
              dataCardADM={estatistica}
            />
          ))}
        </Styled.ContainerCardEstatisticas>
      </Styled.ContainerEstatisticas>

      <Styled.ContainerEstatisticas>
        <h2>Estatísticas do Sistema</h2>
        <Styled.ContainerCardEstatisticas>
          {dataCard.map((estatistica) => (
            <CardEstatistica key={estatistica.id} dataCard={estatistica} />
          ))}
        </Styled.ContainerCardEstatisticas>
      </Styled.ContainerEstatisticas>
    </>
  );
}

export default EstatisticasSistema;
