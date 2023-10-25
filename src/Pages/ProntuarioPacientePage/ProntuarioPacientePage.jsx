import * as Styled from './ProntuarioPacientePage.style'

import { useContext, useEffect, useState } from 'react';
import { HeaderContext } from '../../Context/Header.context';

import { useLocation } from 'react-router-dom';

import { PacienteService } from '../../Service/Paciente.service'; 
/* import { ConsultaService } from '../../../../src/Service/User/Consulta.service';
import { ExameService } from '../../../../src/Service/User/Exame.service'; */

/* import CardConsulta from '../../Components/CardConsulta/CardConsulta';

import CardExame from '../../Components/CardExame/CardExame'; */

export const ProntuarioPage = () => {


  const [paciente, setPaciente] = useState()
  const [consulta, setConsulta] = useState()
  const [exame, setExame] = useState()
  

  const { setData } = useContext(HeaderContext)
  const {pathname} = useLocation()

  useEffect(() => {
    setData({       
      titulo: 'LISTAGEM DE PRONTUÁRIOS'}) 
      const location = pathname.split('/')
      const pacienteId = location[location.length - 1]
      const consultaId = location[location.consulta]
      const exameId = location[location.exame]
      
      const asyncFn = async () => {
        await PacienteService.Show(pacienteId).then(async (response)  => {
          setPaciente(response)
          await ConsultaService.Get().then(res => setConsulta(res.filter(cc => cc.pacienteId === response.id)))
          await ExameService.Get().then(res => setExame(res.filter(e => e.pacienteId === response.id)))
        })

        
      }
      asyncFn()
    }, []);

  

    const render = () => {
        return (

          <>          
          
            <Styled.Prontuario>
            <Styled.HeaderProntuario>
                <Styled.Title>{paciente?.nome}</Styled.Title>
                <Styled.Label>Convênio: {paciente?.convenio}</Styled.Label>
                <Styled.Label>Nacimento: {paciente?.nasc}</Styled.Label>
                <Styled.Label>Contato: {paciente?.tel}</Styled.Label>
            </Styled.HeaderProntuario>

            <Styled.CorpoProntuario>

            <Styled.SubTitle><span>1</span>Consulta</Styled.SubTitle>

              <Styled.RenderResultados>
                  {consulta && consulta.map(consulta => <CardConsulta consulta={consulta} key={consulta.id} />)}
              </Styled.RenderResultados>

            <Styled.SubTitle><span>2</span>Exame</Styled.SubTitle>

              <Styled.RenderResultados>
                  {exame && exame.map(exame => <CardExame exame={exame} key={exame.id} />)}       
              </Styled.RenderResultados>
            </Styled.CorpoProntuario>
          </Styled.Prontuario>

          </>
      )
    }

    return render()
    
  }
  


  

