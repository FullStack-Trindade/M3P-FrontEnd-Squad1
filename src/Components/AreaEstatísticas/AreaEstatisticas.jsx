import CardEstatistica from '../CardEstatistica/CardEstatistica';
import CardEstatisticaADM from '../CardEstatisticaADM/CardEstatisticaADM';
import * as Styled from './AreaEstatisticas.style';
import React, { useState, useEffect } from "react";
import { ImUsers, ImDroplet } from 'react-icons/im';

import { FaLaptopMedical } from 'react-icons/fa';

function EstatisticasSistema() {
  const [users, setUsers] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [exames, setExames] = useState([]);

  const fetchData = async (endpoint) => {
    try {
      const response = await fetch(`src/server/db.json`);
      const data = await response.json();
      return data[endpoint];
    } catch (error) {
      console.error(`Erro ao obter ${endpoint}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const GetUsers = async () => {
      const usersDoDB = await fetchData('users');
      setUsers(usersDoDB)
    }

    const getPacientes = async () => {
      const pacientesDoDB = await fetchData('pacientes');
      setPacientes(pacientesDoDB);
    };

    const getConsultas = async () => {
      const consultasDoDB = await fetchData('consultas');
      setConsultas(consultasDoDB);
    };

    const getExames = async () => {
      const examesDoDB = await fetchData('exames');
      setExames(examesDoDB);
    };

    GetUsers();
    getPacientes();
    getConsultas();
    getExames();
  }, []);

  const totalUsers = () => {
    return users.length;
  }

  const totalPacientes = () => {
    return pacientes.length;
  };

  const totalConsultas = () => {
    return consultas.length;
  };

  const totalExames = () => {
    return exames.length;
  };

  const dataCard = [
    {
      id: '4',
      icone: <ImUsers/>,
      resultado: totalUsers(),
      legenda: 'Usuários',
    },
    {
      id: '1',
      icone: <ImUsers/>,
      resultado: totalPacientes(),
      legenda: 'Pacientes',
    },
    {
      id: '2',
      icone: <FaLaptopMedical/>,
      resultado: totalConsultas(),
      legenda: 'Consultas',
    },
    {
      id: '3',
      icone: <ImDroplet/>,
      resultado: totalExames(),
      legenda: 'Exames',
    },
  ];

  const dataCardADM = [
    {
      id: '4',
      icone: <ImUsers/>,
      resultado: totalUsers(),
      legenda: 'Usuários',
    },
  ];

  return (
    <>
      <Styled.ContainerEstatisticas>
        <h2>Estatísticas do Sistema</h2>
        <Styled.ContainerCardEstatisticas>
          {dataCard.map(estatistica => (
            <CardEstatistica key={estatistica.id} dataCard={estatistica}/>
          ))}
        </Styled.ContainerCardEstatisticas>
      </Styled.ContainerEstatisticas>

    
      <Styled.ContainerEstatisticas>
        <h2>Estatísticas do Sistema do Administrador</h2>
        <Styled.ContainerCardEstatisticas>
          {dataCardADM.map(estatistica => (
            <CardEstatisticaADM key={estatistica.id} dataCardADM={estatistica}/>
          ))}
        </Styled.ContainerCardEstatisticas>
      </Styled.ContainerEstatisticas>
    </>


  );
}

export default EstatisticasSistema;
