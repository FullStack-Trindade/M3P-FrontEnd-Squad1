import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { Layout } from './Layout/Layout'
import { HomePage } from "./Pages/HomePage/HomePage";
import { CadastroExamePage } from "./Pages/CadastroExame/CadastroExamePage";
import { AppointmentRegisterPage } from "./Pages/AppointmentRegister/AppointmentRegisterPage";

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/login' element={<LoginPage/>}/>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/exame' element={<CadastroExamePage/>}/>
{/*               <Route path='/paciente' element={<PacientePage/>}/>
          <Route path='/consulta' element={<ConsultaPage/>}/>
          <Route path='/listaProntuarios' element={<ListaProntuarioPage/>}/>
          <Route path='/prontuarios/:id' element={<ProntuarioPage/>}/> */}
          <Route path="/consulta" element={ <AppointmentRegisterPage /> } />
        </Route>
        <Route path='*' element={ <><p>Essa página não existe</p></> }/>
      </Routes>
    </Router>
  );
}

export default App;