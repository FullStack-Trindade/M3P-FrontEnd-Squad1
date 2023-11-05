import * as Styled from './ProntuarioPacientePage.style'
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { AuthContext } from '../../Context/auth.context';
import { HeaderContext } from '../../Context/Header.context';
import { PatientRecordService } from '../../Service/PatientRecord.service';
import { CardConsulta } from '../../Components/CardConsulta/CardConsulta';
import { CardDieta } from '../../Components/CardDieta/CardDieta';
import { CardExame } from '../../Components/CardExame/CardExame';
import { CardExercicio } from '../../Components/CardExercicio/CardExercicio';
import { CardMedicamento } from '../../Components/CardMedicamento/CardMedicamento';
import { AuthService } from '../../Service/Auth.service';

export const ProntuarioPage = () => {
  let params = new URL(document.location).searchParams;
  const patientId = params.get('id');

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

  const { tokenUser, setTokenUser } = useContext(AuthContext);
  const localToken = JSON.parse(localStorage.getItem('token'));

  const [loading, setLoading] = useState();

  useEffect(() => { 
      if (localToken !== null) {
          setLoading(true);
          fetchAuth();
      }
  }, [localToken]);

  const fetchAuth = async() => {
    const authToken = await AuthService.Get();
    const tokenExists = await authToken.filter(auth => auth.token_user === localToken);

      if (tokenExists.length > 0) { 
        setTokenUser(tokenExists[0]?.token_user);
        setLoading(false);
      }

    }

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

              {   patientRecord[0] &&

                  <Styled.CorpoProntuario>
                      <Styled.SubTitle><span>1</span>Consulta</Styled.SubTitle>

                      <Styled.RenderResultados>
                          { patientRecord[0]?.appointments.map(appointment => <CardConsulta appointment={appointment} key={appointment.id} />) }
                      </Styled.RenderResultados>

                      <Styled.SubTitle><span>2</span>Dieta</Styled.SubTitle>
                      
                      <Styled.RenderResultados>
                          { patientRecord[0]?.diets.map(diet => <CardDieta diet={diet} key={diet.id} />) }
                      </Styled.RenderResultados>

                      <Styled.SubTitle><span>3</span>Exame</Styled.SubTitle>

                      <Styled.RenderResultados>
                          { patientRecord[0]?.exams.map(exam => <CardExame exam={exam} key={exam.id} />) }
                      </Styled.RenderResultados>
                      
                      <Styled.SubTitle><span>4</span>Exercício</Styled.SubTitle> 

                      <Styled.RenderResultados>
                          { patientRecord[0]?.exercises.map(exercise => <CardExercicio exercise={exercise} key={exercise.id} />) }
                      </Styled.RenderResultados>
                      
                      <Styled.SubTitle><span>5</span>Medicação</Styled.SubTitle>

                      <Styled.RenderResultados>
                          { patientRecord[0]?.medications.map(medication => <CardMedicamento medication={medication} key={medication.id} />) }
                      </Styled.RenderResultados>

                  </Styled.CorpoProntuario>

              }
              </Styled.Prontuario>
          </>
      )
    }

    if (loading === true) {
      return <div>Loading...</div>;
    }
  
    return tokenUser && (tokenUser === localToken) ? render() : <Navigate to='/login'/>;
  }