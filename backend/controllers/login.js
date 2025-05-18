import usuarios from "../models/usuarios.js";
import bcrypt from "bcrypt"

class loginUsuarios {
    
    async login (req, res) {
        try {
            const { correo, contraseña } = req.body;

            const usuario = await usuarios.findOne({correo})

            if(!usuario){
                return res.status(401).send({ message: "usuario o contraseña incorrectos"})
            }

            const isValid = await bcrypt.compare(contraseña, usuario.contraseña)

            if(!isValid){
                return res.status(401).send({message: "usuario o contraseña incorrecta"})
            }

            res.status(200).send({
                message: "Login realizado",
                usuario: {
                    nombre: usuario.nombre,
                    correo: usuario.correo
                }
                
            })
        } catch (error) {
            
            res.status(500).send({
                message: "Error en el login",
                error: error.message
            })
        }
    }
}

export default loginUsuarios;