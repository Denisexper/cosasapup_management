import jwt from "jsonwebtoken"
import { DiCelluloid } from "react-icons/di"

const SECRET_KEY = process.env.SECRET_KEY

const auth = (req, res, next) => {


    try {
        
        const autHeader = req.headers.authorization

        //verificamos el encabezado de la authorization

        if (!autHeader || !autHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No se proporcionó el token" });
        }

        //para extraer solamente el token del encabezado authorization

        const token = autHeader.split(" ")[1] // iniciamos con 1 para que empiece de la posicion 1

        const decode = jwt.verify(token, SECRET_KEY)

        //guardamos los datos del usuario para usarlos en la ruta protegida

        req.user = decode

        //usamos next para la solicitud siga su camino hacia la ruta protegida
        next()

    } catch (error) {
        
        res.status(500).send({

            message: "Token invalido o expirado",
            error: error.message
        })
    }
}

export default auth;