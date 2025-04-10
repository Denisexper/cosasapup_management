import { useState, useEffect } from "react";
import {useNavigate} from "react-dom"

function crearPegue () {

    const [formData, setFormData] = useState({
        comunidad: "",
        dueño: "",
        direccion: "",
        codigo: "",
        pagos: "",
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
    } 
}