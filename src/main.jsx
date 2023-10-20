import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'

import { HeaderProvider } from './Context/Header.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <HeaderProvider>
      <App />
    </HeaderProvider>

  </React.StrictMode>,
)
