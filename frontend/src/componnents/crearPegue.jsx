import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import './CrearPegue.css';

function CrearPegue() {
  const [formData, setFormData] = useState({
    comunidad: "",
    dueño: "",
    direccion: "",
    codigo: "",
    pago: "",
    estado: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "estado" ? value === "true" : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si algún campo está vacío
    const camposVacios = Object.entries(formData).filter(
      ([key, value]) => value === ""
    );

    if (camposVacios.length > 0) {
      toast.error("Por favor, completa todos los campos antes de continuar.", {
        duration: 5000, // 5 segundos para que el usuario pueda leerlo con calma
      });
      return; // Detener el envío
    }

    console.log(formData);

    try {
      const response = await fetch("http://localhost:3000/api/crear-pegue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        toast.success("Registro creado con éxito");

        setFormData({
          comunidad: "",
          dueño: "",
          direccion: "",
          codigo: "",
          pago: "",
          estado: ""
        });
      } else {
        toast.error("Error creando registro");
      }
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error en la conexión");
    }
  };

  const handleLis = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Crear nuevo registro</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="comunidad"
            value={formData.comunidad}
            onChange={handleChange}
            className="block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="">Selecciona una comunidad</option>
            <option value="Zapatagua">Zapatagua</option>
            <option value="El almidon">El almidon</option>
            <option value="La Cajita">La Cajita</option>
          </select>

          <input
            type="text"
            name="dueño"
            value={formData.dueño}
            onChange={handleChange}
            placeholder="Nombre Dueño"
            className="block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          <input
            list="direcciones"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Dirección"
            className="block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <datalist id="direcciones">
            <option value="Zapatagua" />
            <option value="El almidon" />
            <option value="La Cajita" />
          </datalist>

          <input
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            placeholder="Código Pegue"
            className="block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          <input
            type="text"
            name="pago"
            value={formData.pago}
            onChange={handleChange}
            placeholder="Pagos realizados"
            className="block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="">Selecciona estado</option>
            <option value={true}>Activo</option>
            <option value={false}>Inactivo</option>
          </select>

          <div className="flex justify-between items-center">
            <button
              className="bg-gray-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-gray-700 focus:outline-none transition-all"
              type="submit"
            >
              Crear
            </button>
            <button
              type="button"
              className="bg-gray-400 text-white py-2 px-6 rounded-md shadow-md hover:bg-gray-500 focus:outline-none transition-all"
              onClick={handleLis}
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrearPegue;
