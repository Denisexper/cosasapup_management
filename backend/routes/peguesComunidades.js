import express from "express";
import peguesControllers from "../controllers/peguesComidades.js";

const app = express.Router();

const controllersPegues = new peguesControllers;

app.post("/crear-pegue", controllersPegues.CrearPegue);
app.get("/obtener-pegues", controllersPegues.ObtenerPegues);




export default app;