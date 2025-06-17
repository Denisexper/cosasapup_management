import express from "express";
import peguesControllers from "../controllers/peguesComidades.js";
import auth from "../middlewares/auth.js"

const app = express.Router();

//app.use(auth); con esto podemos protegerlas todas de un solo sin necesidad de escribir la funcion

const controllersPegues = new peguesControllers;

app.post("/crear-pegue", auth, controllersPegues.CrearPegue);
app.get("/obtener-pegue/:id", auth, controllersPegues.Obtenerpegue);
app.get("/obtener-pegues", auth, controllersPegues.ObtenerPegues);
app.delete("/eliminar-pegue/:id", controllersPegues.EliminarPegue);
app.put("/editar-pegue/:id", auth, controllersPegues.ActualizarPegue);


export default app;