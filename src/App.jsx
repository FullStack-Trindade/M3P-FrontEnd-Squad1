import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppointmentRegisterPage } from "./Pages/AppointmentRegister/AppointmentRegisterPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/consulta" element={ <AppointmentRegisterPage /> } />

        <Route path='*' element={ <><p>Essa página não existe</p></> }/>
      </Routes>
    </Router>
  );
}

export default App;