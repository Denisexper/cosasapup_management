import usuarios from "../models/usuarios.js"
import bcrypt from "bcrypt"

class usuariosControllers {

            async crearUsuario (req, res) {
                try {
                    
                    const {nombre, correo, contraseña } = req.body;

                    if(!nombre || !correo || !contraseña){
                        return res.status(400).send({message: "todos los campos son obligatorios"});
                    }
                    
                    const usuarioExiste = await usuarios.findOne({correo})
                    
                    if(usuarioExiste){
                        return res.status(400).send({message: "el correo ya existe"});
                    }

                    const hasContraseña = await bcrypt.hash(contraseña, 10);

                    const usuario = await usuarios.create({
                        nombre,
                        correo,
                        contraseña: hasContraseña 
                    })

                    res.status(200).send({
                        message: "usuario creado con exito",
                        usuario
                    })
                } catch (error) {
                    
                    res.status(500).send({
                        message: "Error creando usuario",
                        error: error.message
                    })
                }
            }               

    async obtenerUsuarios (req, res) {
        try {
            
            const todosUsuarios = await usuarios.find();
            
            res.status(200).send({
                message: "Usuarios encontrados con exito",
                todosUsuarios
            })
        } catch (error) {
            
            res.status(500).send({
                message: "Error obteniendo usuarios",
                error: error.message
            })
        }
    }

    async obtenerusuario (req, res) {
        try {
            
            const { id } = req.params;

            const usuario = await usuarios.findById(id);

            res.status(200).send({
                message: "Usuario encontrado",
                usuario
        })
        } catch (error) {
            
            res.status(500).send({
                message: "Error obteniendo usuario",
                error: error.message
            })
        }
    }

    async actulizarUsuario (req, res) {
        try {
            
            const { id } = req.params;

            const { nombre, correo, contraseña } = req.body;

            const userActualizado = await usuarios.findByIdAndUpdate(id, { nombre, correo, contraseña }, {new: true});

            res.status(200).send({
                message: "Usuario actualizado",
                userActualizado
            })
        } catch (error) {
            
            res.status(500).send({
                message: "Error actualizando usuario",
                errro: error.message
            })
        }
    }

    async eliminarUsuario (req, res) {
        try {
            
            const { id } = req.params;

            const user = await usuarios.findByIdAndDelete(id)

            res.status(200).send({
                message: ` El usuario ${user.nombre} fue eliminado`,
            
            })
        } catch (error) {
            
            res.status(500).send({
                message: "Error eliminando usuario",
                error: error.message
            })
        }

    }
}

export default usuariosControllers;