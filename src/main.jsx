import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './ecommerce/pages/First.jsx'
import Router from './ecommerce/components/Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router/>
  </StrictMode>
)
