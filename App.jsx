import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginPage } from "./src/Pages/LoginPage/LoginPage";
import { PasswordPage } from "./src/Pages/Password/PasswordPage.jsx";
import { Layout } from "./src/Layout/Layout";
import { HomePage } from "./src/Pages/HomePage/HomePage";
import { ConfigPage } from "./src/Pages/ConfigPage/ConfigPage";
import { CadastroUsuarioPage } from "./src/Pages/CadastroUsuario/CadastroUsuario";
import { PacientePage } from "./src/Pages/CadastroPaciente/CadastroPaciente";
import { MedicalRecordsPage } from "./src/Pages/MedicalRecords/MedicalRecordsPage";
import { ProntuarioPage } from "./src/Pages/ProntuarioPacientePage/ProntuarioPacientePage";
import { AppointmentRegisterPage } from "./src/Pages/AppointmentRegister/AppointmentRegisterPage";
import { MedicationPage } from "./src/Pages/MedicationPage/MedicationPage";
import { DietRegisterPage } from "./src/Pages/DietRegister/DietRegisterPage";
import { CadastroExamPage } from './src/Pages/CadastroExame/CadastroExamPage';
import { CadastroExercisePage } from './src/Pages/CadastroExercise/CadastroExercisePage.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/resetarSenha" element={<PasswordPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/config" element={<ConfigPage />} />
          <Route path="/usuario" element={<CadastroUsuarioPage />} />
              <Route path='/exame' element={<CadastroExamPage/>}/>
              <Route path='/exercicio' element={<CadastroExercisePage/>}/>
          <Route path="/paciente" element={<PacientePage />} />
          <Route path="/paciente/:id" element={<PacientePage />} />
          <Route path="/listaProntuarios" element={<MedicalRecordsPage />} />
          <Route path="/prontuarios" element={<ProntuarioPage />} />
          <Route path="/consulta" element={<AppointmentRegisterPage />} />
          <Route path="/medicamento" element={<MedicationPage />} />
          <Route path="/medicamento/:id" element={<MedicationPage />} />
          <Route path="/dieta" element={<DietRegisterPage />} />
          <Route path="*" element={<p>Essa página não existe</p>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;