import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import { Toaster, toast } from "sonner";

function PerfilUsuario() {
  const { id } = useParams(); // Use useParams to get the ID from the URL

  const navigate = useNavigate();

  const [user, setUser] = useState({
    nombre: "",
    correo: "",
  });

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        // Obtenemos el token
        const token = localStorage.getItem("token");

        // Validamos token
        if (!token) {
          navigate("/");
          return;
        }

        const response = await fetch(
          `http://localhost:3000/api/obtener-usuario/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok)
          throw new Error("No se pudo obtener la información del usuario.");

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
        toast.error("Error al cargar los datos del usuario.");
      }
    };

    if (id) { // Only fetch if ID is available
      obtenerUsuario();
    }
  }, [id, navigate]); // Add navigate to dependency array

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    toast.success("Sesión cerrada correctamente.");
    navigate("/"); // Redirect to login or home page
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Toaster position="top-right" richColors />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Perfil de Usuario
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={user.nombre}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              readOnly // Make it read-only for profile viewing
            />
          </div>

          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={user.correo}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              readOnly // Make it read-only for profile viewing
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default PerfilUsuario;