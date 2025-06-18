import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CrearPegue from './componnents/crearPegue';
import ListarPegues from './componnents/ListarPegues.jsx';
import EditarPegue from './componnents/Editar.jsx';
import Login from './componnents/login.jsx';
import Register from './componnents/register.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/crear" element={<CrearPegue />} />
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<ListarPegues />} />
      <Route path="/editar/:id" element={<EditarPegue />} />
      <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
