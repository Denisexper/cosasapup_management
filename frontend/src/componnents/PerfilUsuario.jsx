import React from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Header from './Header.jsx';
import { useUser } from '../utils/useUser';
import { FaArrowLeft } from "react-icons/fa";

function PerfilUsuario() {
  const navigate = useNavigate();
  const { user, loading } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Sesión cerrada correctamente");
    navigate("/");
  };

  const handleVolver = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto p-8 font-sans">
          <div className="max-w-2xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-6 w-1/3"></div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-8 font-sans">
        <Toaster position="top-right" richColors />
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-light text-gray-800 mb-2">Perfil de Usuario</h1>
            <p className="text-gray-600">Aquí puedes ver tu información personal.</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-bold">
                  Nombre
                </label>
                <input
                  type="text"
                  value={user?.nombre || ''}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-bold">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={user?.correo || ''}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={handleVolver}
                className="flex items-center py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
              >
                <FaArrowLeft className="mr-2" />
                Volver
              </button>
              <button
                onClick={handleLogout}
                className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilUsuario;