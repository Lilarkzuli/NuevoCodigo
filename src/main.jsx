import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Css/index.css'
// import App from './App.jsx'
import Pokemon from './Pokemon.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Pokemon/>
  </StrictMode>,
)
