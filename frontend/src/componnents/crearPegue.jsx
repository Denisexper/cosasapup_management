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
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        })

      } else {
        toast.error("Error creando registro");
      }
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error en la conexión");
    }
  };

  const handleLis = () => {
    navigate("/")
  }

  return (
    <div className="form-container">
      <Toaster />
      <h1>Crear nuevo registro</h1>
      <form onSubmit={handleSubmit} className="form">
        <select
          name="comunidad"
          value={formData.comunidad}
          onChange={handleChange}
          className="input"
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
          className="input"
        />

        <input
          list="direcciones"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          placeholder="Dirección"
          className="input"
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
          className="input"
        />

        <input
          type="text"
          name="pago"
          value={formData.pago}
          onChange={handleChange}
          placeholder="Pagos realizados"
          className="input"
        />

        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className="input"
        >
          <option value="">Selecciona estado</option>
          <option value={true}>Activo</option>
          <option value={false}>Inactivo</option>
        </select>


        <div className="button-group">
          <button className="btn" onClick={handleSubmit}>Crear</button>
          <button className="btn2" onClick={handleLis}>Volver</button>
        </div>

      </form>
    </div>
  );
}

export default CrearPegue;
