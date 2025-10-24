import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';
import Header from './Header.jsx';


function EditarPegue() {

  const backend = import.meta.env.VITE_API_URL
  
  const { id } = useParams();

  const navigate = useNavigate();
  
  const [pegue, setPegue] = useState({
    comunidad: '',
    dueño: '',
    direccion: '',
    codigo: '',
    pago: '',
    estado: '',
  });

  useEffect(() => {

    const obtenerPegue = async () => {

      try {

        //obtenemos el token
        const token = localStorage.getItem("token")

        //validamos si no tiene token lo mandamos a al login
        if(!token){

          navigate("/")

          return
        }

        const res = await fetch(`${backend}/pegues/obtener-pegue/${id}`,{
          headers: {

            //mandamos obtenemos el token
            "Authorization": `Bearer ${token}`,

            "Content-Type": "application/json"
          }
        });

        if (!res.ok) throw new Error('No se pudo obtener el pegue');

        const data = await res.json();

        setPegue(data.pegue);

      } catch (error) {

        console.error(error);

        toast.error('Error al cargar los datos del pegue');
      }
    };

    obtenerPegue();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPegue(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      //obtenemos el token
      const token = localStorage.getItem("token")

      if(!token){

        navigate("/")
        return
      }

      const res = await fetch(`${backend}/pegues/editar-pegue/${id}`, {
        method: 'PUT',
        headers: {
          
          "Authorization": `Bearer ${token}`,
          
          "content-Type": "application/json"
          
        },
        body: JSON.stringify(pegue)
      });

      if (!res.ok) throw new Error('No se pudo actualizar el pegue');
      toast.success('Pegue actualizado correctamente');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error('Error al actualizar el pegue');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-8 font-sans">
        <Toaster position="top-right" richColors />
        <div className="max-w-2xl mx-auto">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Volver al listado
          </button>

          <div className="mb-8">
            <h1 className="text-3xl font-light text-gray-800 mb-2">Editar Registro de Pegue</h1>
            <p className="text-gray-600">Modifique los campos que necesite actualizar</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="comunidad" className="block text-sm font-medium text-gray-700 mb-1 font-bold">Comunidad</label>
                  <select
                    id="comunidad"
                    name="comunidad"
                    value={pegue.comunidad}
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
                    value={pegue.dueño}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1 font-bold">Dirección</label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={pegue.direccion}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="codigo" className="block text-sm font-medium text-gray-700 mb-1 font-bold">Código</label>
                  <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    value={pegue.codigo}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="pago" className="block text-sm font-medium text-gray-700 mb-1 font-bold">Pagos</label>
                  <input
                    type="text"
                    id="pago"
                    name="pago"
                    value={pegue.pago}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1 font-bold">Estado</label>
                  <select
                    id="estado"
                    name="estado"
                    value={pegue.estado === true || pegue.estado === "true" ? "true" : "false"}
                    onChange={(e) => setPegue({...pegue, estado: e.target.value === "true"})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  >
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <FaTimes className="mr-2" /> Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaSave className="mr-2" /> Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarPegue;