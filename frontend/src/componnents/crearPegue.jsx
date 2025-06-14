import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { FaArrowLeft, FaSave } from "react-icons/fa";

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

    const camposVacios = Object.entries(formData).filter(
      ([key, value]) => value === ""
    );

    if (camposVacios.length > 0) {
      toast.error("Por favor, completa todos los campos antes de continuar.", {
        duration: 5000,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/crear-pegue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

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

  const handleVolver = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto p-8 font-sans bg-gray-50 min-h-screen">
      <Toaster position="top-right" richColors />
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-800 mb-2">Nuevo Registro de Pegue</h1>
          <p className="text-gray-600">Complete todos los campos para crear un nuevo registro</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="comunidad" className="block text-sm font-medium text-gray-700 mb-1 font-bold">Comunidad</label>
                <select
                  id="comunidad"
                  name="comunidad"
                  value={formData.comunidad}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                >
                  <option value="">Seleccione comunidad</option>
                  <option value="Zapatagua">Zapatagua</option>
                  <option value="El almidon">El almidon</option>
                  <option value="La Cajita">La Cajita</option>
                </select>
              </div>

              <div>
                <label htmlFor="dueño" className="block text-sm font-medium text-gray-700 mb-1 font-bold">Dueño</label>
                <input
                  type="text"
                  id="dueño"
                  name="dueño"
                  value={formData.dueño}
                  onChange={handleChange}
                  placeholder="Nombre del dueño"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1 font-bold">Dirección</label>
                <input
                  list="direcciones"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  placeholder="Dirección completa"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                />
                <datalist id="direcciones">
                  <option value="Zapatagua" />
                  <option value="El almidon" />
                  <option value="La Cajita" />
                </datalist>
              </div>

              <div>
                <label htmlFor="codigo" className="block text-sm font-medium text-gray-700 mb-1 font-bold">Código</label>
                <input
                  type="text"
                  id="codigo"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  placeholder="Código del pegue"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label htmlFor="pago" className="block text-sm font-medium text-gray-700 mb-1 font-bold">Pagos</label>
                <input
                  type="text"
                  id="pago"
                  name="pago"
                  value={formData.pago}
                  onChange={handleChange}
                  placeholder="Pagos realizados"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1 font-bold">Estado</label>
                <select
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                >
                  <option value="">Seleccione estado</option>
                  <option value={true}>Activo</option>
                  <option value={false}>Inactivo</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleVolver}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <FaArrowLeft className="mr-2" /> Volver
              </button>
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaSave className="mr-2" /> Guardar Registro
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrearPegue;