import React from 'react'
import ReactDOM from 'react-dom/client'

import SimpleState from './SimpleState.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SimpleState title='Contador con JSX' initialN={9} />
  </React.StrictMode>,
)