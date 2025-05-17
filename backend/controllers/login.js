import usuarios from "../models/usuarios.js";

class loginUsuarios {
    
    async login (req, res) {
        try {
            const { correo, contraseña } = req.body;

            const usuario = await usuarios.findOne({correo, contraseña})

            res.status(200).send({
                message: "Login realizado"
            })
        } catch (error) {
            
            res.status(500).send({
                message: "Error en el login",
                error: error.message
            })
        }
    }
}