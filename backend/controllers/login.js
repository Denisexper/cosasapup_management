import usuarios from "../models/usuarios.js";


class loginUsuarios {
    
    async login (req, res) {
        try {
            const { correo, contraseña } = req.body;

            const usuario = await usuarios.findOne({correo})

            if(!usuario){
                return res.status(401).send({ message: "usuario o contraseña incorrectos"})
            }

            if(usuario.contraseña !== contraseña){
                return res.status(401).send({message: "usuario o contraseña incorrectos"});
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