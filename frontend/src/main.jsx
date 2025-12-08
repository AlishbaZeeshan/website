import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { RouterProvider } from 'react-router-dom'
import router from './routes.jsx'
import { UsernameProvider } from './UserContext.jsx'  // ✅ import the provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsernameProvider>
      <RouterProvider router={router} />
    </UsernameProvider>
  </StrictMode>,
)
