import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CrearPegue from './componnents/crearPegue';
import ListarPegues from './componnents/ListarPegues.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/crear" element={<CrearPegue />} />
      <Route path="/" element={<ListarPegues />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
