import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GlobalStyle } from './src/Layout/Global.style.jsx'
import { HeaderProvider } from './src/Context/Header.context'
import { AuthProvider } from './src/Context/auth.context.jsx'

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