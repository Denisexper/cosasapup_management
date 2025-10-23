import React from 'react';
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { generarPDF } from '../reportes/peguesReportes.jsx';
import { FaPlusCircle, FaFileAlt, FaEdit, FaTrashAlt, FaSearch, FaChevronLeft, FaChevronRight, FaUserCircle } from 'react-icons/fa';
import Header from './Header.jsx';


function ListarPegues() {

  const backend = import.meta.env.VITE_API_URL

  const [pegues, setPegues] = useState([]);
  const [comunidadFiltro, setComunidadFiltro] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10; // Mostrar 10 registros por página
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPegues = async () => {
      try {

        const token = localStorage.getItem("token")

        //verificamos y redirigimos al login si no hay token
        if (!token) {

          navigate("/")
        }

        const response = await fetch(`${backend}/pegues/obtener-pegues`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (data && data.todosPegues && data.todosPegues.length > 0) {

          setPegues(data.todosPegues);

        } else {

          console.error("error desconocido");
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

  const handleDelete = (id) => {
    toast.custom((t) => (
      <div className="bg-white rounded-lg shadow-md p-4 w-80 border border-gray-200">
        <h2 className="text-gray-900 font-semibold text-base mb-2">¿Eliminar registro?</h2>
        <p className="text-gray-600 text-sm mb-4">Esta acción no se puede deshacer. ¿Deseas continuar?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => toast.dismiss(t)}
            className="px-4 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t); // Cierra el modal

              const token = localStorage.getItem("token")

              if(!token){

                navigate("/")
                return
              }

              try {
                const response = await fetch(`${backend}/eliminar-pegue/${id}`, {
                  method: "DELETE",
                  headers: {
                    "Authorization": `Bearer ${token}`
                  }
                });

                if (!response.ok) {
                  toast.error("Error eliminando registro");
                  return;
                }

                setPegues((prev) => prev.filter((pegue) => pegue._id !== id));
                toast.success("Registro eliminado correctamente");
              } catch (error) {
                console.error("Error eliminando el registro", error);
                toast.error("Error al eliminar");
              }
            }}
            className="px-4 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    ));
  };


  const peguesFiltrados = pegues.filter(p => {
    const comunidadMatch = comunidadFiltro ? p.comunidad === comunidadFiltro : true;
    const estadoMatch =
      estadoFiltro === "activo" ? p.estado === true :
        estadoFiltro === "inactivo" ? p.estado === false :
          true;
    const searchMatch = searchTerm ?
      Object.values(p).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      ) : true;
    return comunidadMatch && estadoMatch && searchMatch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = peguesFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(peguesFiltrados.length / itemsPerPage);

  // Función para manejar cambio de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-8 font-sans">
        <Toaster position="top-right" richColors />
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-light text-gray-800 mb-2">Gestión de Pegues</h1>
            <p className="text-gray-600">Listado completo de registros de pegue</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar en todos los campos..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-sm transition-all flex items-center justify-center"
                  onClick={handleChange}
                >
                  <FaPlusCircle className="mr-2" /> Nuevo Registro
                </button>
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow-sm transition-all flex items-center justify-center"
                  onClick={() => generarPDF(currentItems, currentPage, itemsPerPage)}
                >
                  <FaFileAlt className="mr-2" /> Generar PDF
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <label htmlFor="comunidad-select" className="block text-sm font-medium text-gray-700 mb-1 font-bold">Comunidad</label>
                <select
                  id="comunidad-select"
                  value={comunidadFiltro}
                  onChange={(e) => {
                    setComunidadFiltro(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                >
                  <option value="">Todas las comunidades</option>
                  <option value="Zapatagua">Zapatagua</option>
                  <option value="El almidon">El almidon</option>
                  <option value="La Cajita">La Cajita</option>
                </select>
              </div>

              <div>
                <label htmlFor="estado-select" className="block text-sm font-medium text-gray-700 mb-1 font-bold">Estado</label>
                <select
                  id="estado-select"
                  value={estadoFiltro}
                  onChange={(e) => {
                    setEstadoFiltro(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                >
                  <option value="">Todos los estados</option>
                  <option value="activo">Activos</option>
                  <option value="inactivo">Inactivos</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">#</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Comunidad</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Dueño</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Dirección</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Código</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Pagos</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map((pegue, index) => (
                      <tr key={pegue._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{indexOfFirstItem + index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pegue.comunidad}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pegue.dueño}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pegue.direccion}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pegue.codigo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pegue.pago}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${pegue.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {pegue.estado ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEditar(pegue._id)}
                              className="text-blue-600 hover:text-blue-900 transition-colors"
                              title="Editar"
                            >
                              <FaEdit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(pegue._id)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                              title="Eliminar"
                            >
                              <FaTrashAlt className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                        No se encontraron registros que coincidan con los filtros
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Siguiente
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a{' '}
                      <span className="font-medium">{Math.min(indexOfLastItem, peguesFiltrados.length)}</span> de{' '}
                      <span className="font-medium">{peguesFiltrados.length}</span> resultados
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <span className="sr-only">Anterior</span>
                        <FaChevronLeft className="h-4 w-4" />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i}
                          onClick={() => paginate(i + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === i + 1
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <span className="sr-only">Siguiente</span>
                        <FaChevronRight className="h-4 w-4" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListarPegues