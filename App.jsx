import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { LoginPage } from './src/Pages/LoginPage/LoginPage'
import { HomePage } from './src/Pages/HomePage/HomePage.jsx'
import { Layout } from './src/Layout/Layout'
import { CadastroExamePage } from './src/Pages/CadastroExame/CadastroExamePage.jsx'
import { PacientePage } from "./src/Pages/CadastroPaciente/CadastroPaciente.jsx";
/*
import { ConsultaPage } from './assets/Pages/CadastroConsulta/CadastroConsulta.jsx'
import { ListaProntuarioPage } from './assets/Pages/ListaProntuario/ListaProntuario.jsx'
import { ProntuarioPage } from './assets/Pages/ProntuarioPage/Prontuario.jsx' */

function App() {
  return (

    <Router>
      <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/' element={<Layout/>}>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/exame' element={<CadastroExamePage/>}/>
          <Route path="/paciente" element={<PacientePage />} />
          <Route path="/paciente/:id" element={<PacientePage />} />
            {/*<Route path='/consulta' element={<ConsultaPage/>}/>
              <Route path='/listaProntuarios' element={<ListaProntuarioPage/>}/>
              <Route path='/prontuarios/:id' element={<ProntuarioPage/>}/> */}
          </Route>
          <Route path='*' element={<><p>Essa página não existe</p></>}/>
          
       </Routes>
    </Router>
  )
}

export default App
