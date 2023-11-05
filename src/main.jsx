import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../App.jsx'

import { GlobalStyle } from './Layout/Global.style'
import { HeaderProvider } from './Context/Header.context.jsx'
import { AuthProvider } from './Context/auth.context.jsx'
import { ThemeProvider } from './Context/Theme.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle/>

<ThemeProvider>

    <HeaderProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HeaderProvider>

</ThemeProvider>
  </React.StrictMode>,
)
