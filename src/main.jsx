import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './ecommerce/pages/First.jsx'
import First from '../src/ecommerce/pages/First.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <First />
  </StrictMode>
)
