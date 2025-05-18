import connection from "./connection/connection.js";
import peguesRoutes from "./routes/peguesComunidades.js"
import usuariosRoutes from "./routes/usuarios.js"
import express from "express"
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000

app.listen(port, () => {

    console.log("servidor corriendo")
})

connection();

app.use("/api",peguesRoutes);
app.use("/app",usuariosRoutes);
