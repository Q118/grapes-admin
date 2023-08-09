import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
// import { AuthProvider } from './AuthProvider.tsx'
import { AdminProvider } from './contexts/AdminContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AdminProvider>
            <App />
        </AdminProvider>
    </React.StrictMode>,
)
