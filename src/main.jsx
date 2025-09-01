import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Game from '../../3a-aula/src/App.jsx'

 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Game/>
  </StrictMode>,
)
