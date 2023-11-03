import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginPage } from "./src/Pages/LoginPage/LoginPage";
import { Layout } from './src/Layout/Layout'
import { HomePage } from "./src/Pages/HomePage/HomePage";
import { MedicalRecordsPage } from './src/Pages/MedicalRecords/MedicalRecordsPage'
import { CadastroExamePage } from "./src/Pages/CadastroExame/CadastroExamePage";
import { AppointmentRegisterPage } from "./src/Pages/AppointmentRegister/AppointmentRegisterPage";
// comentário teste
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={ <LoginPage/> }/>

        <Route path='/' element={ <Layout/> }>
          <Route path='/' element={ <HomePage/> }/>
          <Route path='/listaProntuarios' element={ <MedicalRecordsPage/> }/>
          <Route path='/exame' element={ <CadastroExamePage/> }/>
          <Route path="/consulta" element={ <AppointmentRegisterPage /> } />
{/*               <Route path='/paciente' element={<PacientePage/>}/>
          <Route path='/consulta' element={<ConsultaPage/>}/>
          <Route path='/listaProntuarios' element={<ListaProntuarioPage/>}/>
          <Route path='/prontuarios/:id' element={<ProntuarioPage/>}/> */}
        </Route>

        <Route path='*' element={ <><p>Essa página não existe</p></> }/>
      </Routes>
    </Router>
  );
}

export default App;