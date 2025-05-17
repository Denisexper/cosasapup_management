import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },

    correo: {
        type: String,
        required: true,
        trim: true,
    },

    contraseña: {
        type: String,
        required: true,
        trim: true,
    }
})

const usuarios = mongoose.model("usuarios", usuariosSchema)
export default usuarios;
