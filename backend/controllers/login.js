import usuarios from "../models/usuarios.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.SECRET_KEY

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

            //creacion del token
            const token = jwt.sign(

                { id: usuario._id, correo: usuario.correo, nombre: usuario.nombre },
                SECRET_KEY,
                {expiresIn: "1h"}   
            )

            res.status(200).send({
                message: "Login realizado",
                token, //devolvemos el token
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

    async register (req, res) {
        try {
            
            const { nombre, correo, contraseña } = req.body;

            if(!nombre || !correo || !contraseña){
                res.status(400).send({message: "todos los campos son obligatorios"})
            }

            const usuarioExiste = await usuarios.findOne({correo})

            if(usuarioExiste){
                return res.status(400).send({message: "El correo ya existe"})
            }

            const hasContraseña = await bcrypt.hash(contraseña, 10)

            const usuario = await usuarios.create({ nombre, correo, contraseña: hasContraseña })

            res.status(200).send({

                message: "Register sucessfull",
                usuario
            })
        } catch (error) {
           
            res.status(500).send({
                
                message: "Error desconocido",
                error: error.message
            })

        }
    }
}

export default loginUsuarios;