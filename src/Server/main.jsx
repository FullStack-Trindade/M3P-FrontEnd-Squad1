import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../../App'
import { GlobalStyle } from './Global.style.jsx'
import { HeaderProvider } from '../Context/Header.context'
import { AuthProvider } from '../Context/auth.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle/>

    <HeaderProvider>
      <AuthProvider>
         <App/>
      </AuthProvider>
    </HeaderProvider>


   
  </React.StrictMode>,
)