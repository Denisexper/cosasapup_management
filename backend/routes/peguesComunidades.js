import express from "express";
import peguesControllers from "../controllers/peguesComidades.js";

const app = express.Router();

const controllersPegues = new peguesControllers;

app.post("/crear-pegue", controllersPegues.CrearPegue);
app.get("/obtener-pegue/:id", controllersPegues.Obtenerpegue);
app.get("/obtener-pegues", controllersPegues.ObtenerPegues);
app.delete("/eliminar-pegue/:id", controllersPegues.EliminarPegue);
app.put("/editar-pegue/:id", controllersPegues.ActualizarPegue);




export default app;