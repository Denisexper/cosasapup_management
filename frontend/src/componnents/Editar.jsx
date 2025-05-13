import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

function EditarPegue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pegue, setPegue] = useState({
    comunidad: '',
    dueño: '',
    direccion: '',
    codigo: '',
    pago: ''
  });

  useEffect(() => {
    const obtenerPegue = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/obtener-pegue/${id}`); // <-- Cambia la URL si es diferente
        if (!res.ok) throw new Error('No se pudo obtener el pegue');
        const data = await res.json();
        setPegue(data.pegue); // Ajusta si el JSON viene con otro nombre
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
      const res = await fetch(`http://localhost:3000/api/editar-pegue/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pegue)
      });

      if (!res.ok) throw new Error('No se pudo actualizar el pegue');

      toast.success('Pegue actualizado correctamente');
      navigate('/'); // Redirige al listado después de editar
    } catch (error) {
      console.error(error);
      toast.error('Error al actualizar el pegue');
    }
  };

  return (
    <div className="form-container">
      <Toaster />
      <h2>Editar Pegue</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Comunidad:
          <input
            type="text"
            name="comunidad"
            value={pegue.comunidad}
            onChange={handleChange}
            className="input"
          />
        </label>

        <label>
          Dueño:
          <input
            type="text"
            name="dueño"
            value={pegue.dueño}
            onChange={handleChange}
            className="input"
          />
        </label>

        <label>
          Dirección:
          <input
            type="text"
            name="direccion"
            value={pegue.direccion}
            onChange={handleChange}
            className="input"
          />
        </label>

        <label>
          Código:
          <input
            type="text"
            name="codigo"
            value={pegue.codigo}
            onChange={handleChange}
            className="input"
          />
        </label>

        <label>
          Pago:
          <input
            type="text"
            name="pago"
            value={pegue.pago}
            onChange={handleChange}
            className="input"
          />
        </label>

        <div className="button-group">
          <button type="submit" className="btn">Guardar Cambios</button>
          <button type="button" className="btn2" onClick={() => navigate('/')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default EditarPegue;
