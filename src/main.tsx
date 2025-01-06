// base
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

// style
import './shared/Css/main.css'

// root
import App from './app/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
