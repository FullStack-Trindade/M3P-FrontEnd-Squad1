import CardEstatistica from '../CardEstatistica/CardEstatistica';
import * as Styled from './AreaEstatisticas.style';
import React, { useState, useEffect } from "react";
import { ImUsers, ImDroplet } from 'react-icons/im';

import { FaLaptopMedical } from 'react-icons/fa';

function EstatisticasSistema() {
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

    getPacientes();
    getConsultas();
    getExames();
  }, []);

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
    </>
  );
}

export default EstatisticasSistema;
