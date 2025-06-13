import React from 'react';
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { generarPDF } from '../reportes/peguesReportes.jsx';
import { FaPlusCircle, FaFileAlt, FaEdit, FaTrashAlt } from 'react-icons/fa';

function ListarPegues() {
  const [pegues, setPegues] = useState([]);
  const [comunidadFiltro, setComunidadFiltro] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPegues = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/obtener-pegues");
        const data = await response.json();
        if (data && data.todosPegues && data.todosPegues.length > 0) {
          setPegues(data.todosPegues);
        } else {
          toast.error("No se encontraron registros");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error al obtener los registros");
      }
    };

    fetchPegues();
  }, []);

  const handleChange = () => {
    navigate("/crear");
  };

  const handleEditar = (id) => {
    navigate(`/Editar/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/eliminar-pegue/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        toast.error("Error eliminando registro");
        return;
      }
      setPegues(pegues.filter(pegue => pegue._id !== id));
      toast.success("Registro eliminado correctamente");
    } catch (error) {
      console.error("Error eliminando el registro", error);
      toast.error("Error al eliminar");
    }
  };

  const peguesFiltrados = pegues.filter(p => {
    const comunidadMatch = comunidadFiltro ? p.comunidad === comunidadFiltro : true;
    const estadoMatch =
      estadoFiltro === "activo" ? p.estado === true :
      estadoFiltro === "inactivo" ? p.estado === false :
      true;
    return comunidadMatch && estadoMatch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = peguesFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(peguesFiltrados.length / itemsPerPage);

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md font-sans">
      <Toaster />
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Listado de Pegues</h1>

      <div className="flex justify-between mb-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-700 transition-all flex items-center"
          onClick={handleChange}
        >
          <FaPlusCircle className="mr-2" /> Crear Registro
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-700 transition-all flex items-center"
          onClick={() => generarPDF(peguesFiltrados)}
        >
          <FaFileAlt className="mr-2" /> Generar Reporte
        </button>
      </div>

      <div className="flex justify-between mb-6">
        <div className="flex items-center space-x-4">
          <label htmlFor="comunidad-select" className="text-gray-700">Seleccionar comunidad:</label>
          <select
            id="comunidad-select"
            value={comunidadFiltro}
            onChange={(e) => {
              setComunidadFiltro(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-500"
          >
            <option value="">Todas</option>
            <option value="Zapatagua">Zapatagua</option>
            <option value="El almidon">El almidon</option>
            <option value="La Cajita">La Cajita</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <label htmlFor="estado-select" className="text-gray-700">Filtrar por estado:</label>
          <select
            id="estado-select"
            value={estadoFiltro}
            onChange={(e) => {
              setEstadoFiltro(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-500"
          >
            <option value="">Todos</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
          </select>
        </div>
      </div>

      <table className="min-w-full table-auto border-collapse bg-white shadow-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-gray-700">#</th>
            <th className="px-4 py-2 text-left text-gray-700">Comunidad</th>
            <th className="px-4 py-2 text-left text-gray-700">Dueño Pegue</th>
            <th className="px-4 py-2 text-left text-gray-700">Dirección</th>
            <th className="px-4 py-2 text-left text-gray-700">Código Pegue</th>
            <th className="px-4 py-2 text-left text-gray-700">Pagos</th>
            <th className="px-4 py-2 text-left text-gray-700">Estado</th>
            <th className="px-4 py-2 text-left text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((pegue, index) => (
            <tr key={pegue._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-700">{indexOfFirstItem + index + 1}</td>
              <td className="px-4 py-3 text-gray-700">{pegue.comunidad}</td>
              <td className="px-4 py-3 text-gray-700">{pegue.dueño}</td>
              <td className="px-4 py-3 text-gray-700">{pegue.direccion}</td>
              <td className="px-4 py-3 text-gray-700">{pegue.codigo}</td>
              <td className="px-4 py-3 text-gray-700">{pegue.pago}</td>
              <td className="px-4 py-3 text-gray-700">{pegue.estado ? 'Activo' : 'Inactivo'}</td>
              <td className="px-4 py-3 flex space-x-3 justify-center">
                <button
                  className="bg-red-400 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-all flex items-center"
                  onClick={() => handleDelete(pegue._id)}
                >
                  <FaTrashAlt className="mr-2" /> Eliminar
                </button>
                <button
                  className="bg-yellow-400 text-white py-1 px-3 rounded-md hover:bg-yellow-600 transition-all flex items-center"
                  onClick={() => handleEditar(pegue._id)}
                >
                  <FaEdit className="mr-2" /> Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-md border ${currentPage === i + 1 ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-600'} hover:bg-gray-500 transition-all`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ListarPegues;
