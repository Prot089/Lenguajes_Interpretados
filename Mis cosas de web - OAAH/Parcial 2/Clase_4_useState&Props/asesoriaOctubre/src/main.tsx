import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Component from './Component.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Component nBotones={6} />
  </React.StrictMode>,
)
