import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

function CrearPegue() {
  const [formData, setFormData] = useState({
    comunidad: "",
    dueño: "",
    direccion: "",
    codigo: "",
    pagos: "",
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
            pagos: "",
        })

      } else {
        toast.error("Error creando registro");
      }
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error en la conexión");
    }
  };

  return (
    <div className="form-container">
      <Toaster />
      <h1>Crear nuevo registro</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="comunidad"
          value={formData.comunidad}
          onChange={handleChange}
          placeholder="Nombre Comunidad"
          className="input"
        />

        <input
          type="text"
          name="dueño"
          value={formData.dueño}
          onChange={handleChange}
          placeholder="Nombre Dueño"
          className="input"
        />

        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          placeholder="Dirección"
          className="input"
        />

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
          name="pagos"
          value={formData.pagos}
          onChange={handleChange}
          placeholder="Pagos realizados"
          className="input"
        />

        <button type="submit" className="btn">
          Crear
        </button>
      </form>
    </div>
  );
}

export default CrearPegue;
