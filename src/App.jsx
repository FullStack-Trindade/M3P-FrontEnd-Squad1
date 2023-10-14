import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PacientePage } from "./Pages/CadastroPaciente/CadastroPaciente.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/paciente" element={<PacientePage />} />
      </Routes>
    </Router>
  );
}

export default App;
