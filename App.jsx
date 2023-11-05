import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginPage } from "./src/Pages/LoginPage/LoginPage";
import { Layout } from './src/Layout/Layout'
import { CadastroExamPage } from './src/Pages/CadastroExame/CadastroExamPage';
import { CadastroExercisePage } from './src/Pages/CadastroExercise/CadastroExercisePage.jsx';
import { PacientePage } from "./src/Pages/CadastroPaciente/CadastroPaciente.jsx";
import { CadastroUsuarioPage } from './src/Pages/CadastroUsuario/CadastroUsuario';


function App() {
  return (
    <Router>
      <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/' element={<Layout/>}>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/exame' element={<CadastroExamPage/>}/>
              <Route path='/exercise' element={<CadastroExercisePage/>}/>
          <Route path="/paciente" element={<PacientePage />} />
          <Route path="/paciente/:id" element={<PacientePage />} />
          <Route path="/listaProntuarios" element={<MedicalRecordsPage />} />
          <Route path="/consulta" element={<AppointmentRegisterPage />} />
          <Route path="*" element={<><p>Essa página não existe</p></>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
