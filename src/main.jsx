import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

import { GlobalStyle } from './Layout/Global.style'
import { HeaderProvider } from './Context/Header.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle/>

    <HeaderProvider>
      <App />
    </HeaderProvider>

  </React.StrictMode>,
)
