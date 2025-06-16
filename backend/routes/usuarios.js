import express from "express";
import usuariosControllers from "../controllers/usuarios.js";
import loginUsuarios from "../controllers/login.js";

const app = express.Router();

const controllersUsuarios = new usuariosControllers;
const loginUser = new loginUsuarios;

app.post("/crear-usuario", controllersUsuarios.crearUsuario);
app.get("/obtener-usuarios", controllersUsuarios.obtenerUsuarios);
app.delete("/eliminar/:id", controllersUsuarios.eliminarUsuario);

//login
app.post("/login", loginUser.login);
app.post("/register", loginUser.register);

export default app;

