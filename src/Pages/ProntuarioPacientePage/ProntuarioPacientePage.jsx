import * as Styled from './ProntuarioPacientePage.style'
import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

import { HeaderContext } from '../../Context/Header.context';
import { PatientRecordService } from '../../Service/PatientRecord.service';
// import { AuthService } from '../../Service/Auth.service';

/* import CardConsulta from '../../Components/CardConsulta/CardConsulta';
import CardExame from '../../Components/CardExame/CardExame'; */

export const ProntuarioPage = () => {
  const { pathname } = useLocation();
  const location = pathname.split('/');
  const patientId = location[location.length - 1];

  const { setData } = useContext(HeaderContext);

  const [patientsRecordList, setPatientsRecordList] = useState([]);

  useEffect(() => {
    setData({ titulo: 'LISTAGEM DE PRONTUÁRIOS' });

    if (patientId !== null) {
      fetchPatientsRecord();
    }
  }, []);
    
    const fetchPatientsRecord = async() => {
      await PatientRecordService.Show().then(result  => setPatientsRecordList(result));
    }

    const [patientRecord, setPatientRecord] = useState([]);

    useEffect(() => {
      const filteredPatient = patientsRecordList.filter(value => value.id.toString().includes(patientId))
      setPatientRecord(filteredPatient);
  }, [patientsRecordList, patientId])

  // const { tokenUser, setTokenUser } = useContext(AuthContext);
  //   const localToken = JSON.parse(localStorage.getItem('token'));

  //   useEffect(() => { 
  //       if (localToken !== null) {
  //           fetchAuth() 
  //       }
  //   }, [localToken]);

  //   const fetchAuth = async() => {
  //       const authToken = await AuthService.Get();
  //       const tokenExists = authToken.filter(auth => auth.token_user === localToken);

  //       if (tokenExists.length === 0) { return }
        
  //       setTokenUser(tokenExists[0]?.token_user);
  //   }

    const render = () => {
        return (
          <>
              <Styled.Prontuario>
                  <Styled.HeaderProntuario>
                      <Styled.Title>{ patientRecord[0]?.user.name }</Styled.Title>

                      <Styled.PatientData>
                        <Styled.List>Nascimento: { dayjs(patientRecord[0]?.birth).format('DD/MM/YYYY') }</Styled.List>
                        <Styled.List>Contato de Emergência: { patientRecord[0]?.emergencyContact }</Styled.List>
                        <Styled.List>Convênio: { patientRecord[0]?.healthInsurance }</Styled.List>
                        <Styled.List>Número do Convênio: { patientRecord[0]?.insuranceNumber }</Styled.List>
                        <Styled.List>Validade do Convênio: { dayjs(patientRecord[0]?.insuranceVality).format('MM/YYYY') }</Styled.List>
                      </Styled.PatientData>

                      <Styled.PatientData>
                        <Styled.List>{ patientRecord[0]?.adress_id.street }, {patientRecord[0]?.adress_id.number}{' - ' + patientRecord[0]?.adress_id.complement }</Styled.List>
                        <Styled.List>{ patientRecord[0]?.adress_id.cep.substring(0, 5).concat('-', patientRecord[0]?.adress_id.cep.substring(5, 8)) }</Styled.List>
                        <Styled.List>{ patientRecord[0]?.adress_id.reference }</Styled.List>
                      </Styled.PatientData>
                  </Styled.HeaderProntuario>

                  <Styled.CorpoProntuario>
                      <Styled.SubTitle><span>1</span>Consulta</Styled.SubTitle>
                      <Styled.RenderResultados>
                          {/* { patientRecord[0]?.appointments.map(appointment => <CardConsulta consulta={appointment} key={appointment.id} />) } */}
                      </Styled.RenderResultados>

                      <Styled.SubTitle><span>2</span>Exame</Styled.SubTitle>
                      <Styled.RenderResultados>
                          {/* { patientRecord[0].exams.map(exam => <CardExame exame={exam} key={exam.id} />) } */}
                      </Styled.RenderResultados>
                  </Styled.CorpoProntuario>
              </Styled.Prontuario>
          </>
      )
    }

    // return !!tokenUser && (tokenUser === localToken) ? <Navigate to='/' /> : render();
    return render();
  }