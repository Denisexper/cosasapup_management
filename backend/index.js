import connection from "./connection/connection.js";
import peguesRoutes from "./routes/peguesComunidades.js"
import usuariosRoutes from "./routes/usuarios.js"
import express from "express"
import cors from "cors"

const app = express();

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173", "https://cosasapup-management-pr17.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

const port = process.env.PORT

app.listen(port, () => {

    console.log("servidor corriendo")
})

connection();

app.use("/app/pegues",peguesRoutes);
app.use("/app/usuarios",usuariosRoutes);
