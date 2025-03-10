import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RoutesApp from './routes/routes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoutesApp/>
  </StrictMode>,
)

