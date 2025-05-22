import "./login.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react"

function Login () {

    const [loginData, setLoginData] = useState({

        correo : "",
        contraseña : "",
    });

    const navigate = useNavigate();

    const [ error, setError ] = useState("")
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoginData({...loginData, [name]: value});
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            
            const response = await fetch("http://localhost:3000/app/login", {
                method: "POST",

                headers:{"content-type":"application/json"},

                body: JSON.stringify(loginData)
            });

            if(!response.ok){
                throw new Error("Credenciales invalidas")
            }

            const data = await response.json();

            navigate("/dashboard")

        } catch (error) {
            
            setError(error.message)
        };

    }

    return (
        <div className="login-container">

            <form onSubmit={handleSubmit}>

            <h2>Iniciar Sesion</h2>

            <input type="text"
            name="correo"
            value={loginData.correo}
            onChange={handleChange}
            className="input-correo"
            placeholder="correo electronico"
            required
            />

            <input type="password" 
            name="contraseña"
            placeholder="contraseña"
            onChange={handleChange}
            className="input-contraseña"
            required
            />

            {error && <p className="error">{error}</p>}

            <button className="btn-login" type="submit">Ingresar</button>

            </form>
        </div>
    )
}

export default Login;