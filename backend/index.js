import connection from "./connection/connection.js";
import peguesRoutes from "./routes/peguesComunidades.js"
import express from "express"

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000

app.listen(port, () => {

    console.log("servidor corriendo")
})

connection();

app.use("/api",peguesRoutes);