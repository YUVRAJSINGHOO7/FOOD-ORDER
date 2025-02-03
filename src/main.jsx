import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>   {/* every component gets rendered twice by REACT during development, to help us catch potential bugs and errors */}
    <App />
  </React.StrictMode>,
)
