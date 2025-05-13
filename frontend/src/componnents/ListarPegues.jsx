import './ListarPegues.css'
import { useState, useEffect } from 'react'
import { Toaster, toast } from 'sonner'
import { useNavigate } from 'react-router-dom';
import { generarPDF } from '../reportes/peguesReportes.jsx';

function ListarPegues () {
  const [pegues, setPegues] = useState([]);
  const [comunidadFiltro, setComunidadFiltro] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPegues = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/obtener-pegues");
        const data = await response.json();
        console.log(data);
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
    navigate("/crear")
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

  const peguesFiltrados = comunidadFiltro
    ? pegues.filter(p => p.comunidad === comunidadFiltro)
    : pegues;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = peguesFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(peguesFiltrados.length / itemsPerPage);

  return (
    <div className="table-container">
      <Toaster />
      <h1 className="title">Listado de Pegues</h1>

      <div className="button-group">
        <button className="btn" onClick={handleChange}>Crear Registro</button>
        <button className="btn2" onClick={() => generarPDF(peguesFiltrados)}>Generar Reporte</button>
      </div>

      <div className="filter-container">
        <label htmlFor="comunidad-select">Seleccionar comunidad:</label>
        <select
          id="comunidad-select"
          value={comunidadFiltro}
          onChange={(e) => {
            setComunidadFiltro(e.target.value);
            setCurrentPage(1);
          }}
          className="input"
        >
          <option value="">Todas</option>
          <option value="Zapatagua">Zapatagua</option>
          <option value="El almidon">El almidon</option>
          <option value="La Cajita">La Cajita</option>
        </select>
      </div>

      <table className="pegue-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Comunidad</th>
            <th>Dueño Pegue</th>
            <th>Dirección</th>
            <th>Código Pegue</th>
            <th>Pagos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((pegue, index) => (
            <tr key={pegue._id}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{pegue.comunidad}</td>
              <td>{pegue.dueño}</td>
              <td>{pegue.direccion}</td>
              <td>{pegue.codigo}</td>
              <td>{pegue.pago}</td>
              <td>
                <button
                  className="btn-eliminar"
                  onClick={() => handleDelete(pegue._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
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
