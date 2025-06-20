import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logos/logo.png';
import { FaUserCircle } from 'react-icons/fa';
import { useUser } from '../utils/useUser.ts';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          <img src={logo} alt="COSASAPUP Logo" className="h-10 w-auto" />
          <h1 className="text-xl font-semibold">COSASAPUP</h1>
        </div>
        
        <button
          onClick={() => navigate("/perfil")}
          className="text-white hover:text-gray-200"
          title="Perfil de usuario"
        >
          <FaUserCircle size={32} />
        </button>
      </div>
    </header>
  );
}

export default Header; 