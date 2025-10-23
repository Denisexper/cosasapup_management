import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

function UserAvatar() {

  const backend = import.meta.env.VITE_API_URL

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerUsuarioActual = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          navigate("/");
          return;
        }

        // Decodificar el token JWT para obtener el ID del usuario
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id;

        const response = await fetch(
          `${backend}/usuarios/obtener-usuario/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          console.error("Error al obtener usuario actual");
        }
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuarioActual();
  }, [navigate]);

  const handleClick = () => {
    navigate("/perfil");
  };

  const getInitials = (nombre) => {
    if (!nombre) return "U";
    return nombre
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse flex items-center justify-center">
        <FaUser className="text-gray-400" />
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-sm transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
      title={user?.nombre || "Perfil de usuario"}
    >
      {user?.nombre ? getInitials(user.nombre) : <FaUser />}
    </button>
  );
}

export default UserAvatar;
