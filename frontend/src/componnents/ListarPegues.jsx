import './ListarPegues.css'
import { useState, useEffect } from 'react'
import { Toaster, toast } from 'sonner'
import { useNavigate } from 'react-router-dom';
import { generarPDF } from '../reportes/peguesReportes.jsx';

function ListarPegues () {
  const [pegues, setPegues] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

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
  }
  // Calcular qué items mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pegues.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(pegues.length / itemsPerPage);

  return (
    <div className="table-container">
      <Toaster />
      <h1 className="title">Listado de Pegues</h1>
        <div className="button-group">
            <button className="btn" onClick={handleChange}>Crear Registro</button>
            <button className="btn2" onClick={() => generarPDF(pegues)}>Generar Reporte</button>
        </div>

      <table className="pegue-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Comunidad</th>
            <th>Dueño</th>
            <th>Dirección</th>
            <th>Código</th>
            <th>Pago</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((pegue, index) => (
            <tr key={index}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{pegue.comunidad}</td>
              <td>{pegue.dueño}</td>
              <td>{pegue.direccion}</td>
              <td>{pegue.codigo}</td>
              <td>{pegue.pago}</td>
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
