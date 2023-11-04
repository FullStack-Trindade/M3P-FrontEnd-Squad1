import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginPage } from "./src/Pages/LoginPage/LoginPage";
import { Layout } from './src/Layout/Layout'
import { HomePage } from "./src/Pages/HomePage/HomePage";
import { MedicalRecordsPage } from './src/Pages/MedicalRecords/MedicalRecordsPage'
import { CadastroExamePage } from "./src/Pages/CadastroExame/CadastroExamePage";
import { AppointmentRegisterPage } from "./src/Pages/AppointmentRegister/AppointmentRegisterPage";
<<<<<<< HEAD
=======
import { PacientePage } from "./src/Pages/CadastroPaciente/CadastroPaciente.jsx";
import { CadastroUsuarioPage } from './src/Pages/CadastroUsuario/CadastroUsuario';

>>>>>>> 7200ce9489ecbf65fd6857e4a8bf870aa9777732

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/usuario" element={<CadastroUsuarioPage />} />
          <Route path="/exame" element={<CadastroExamePage />} />
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
