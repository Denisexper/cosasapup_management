import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config();

const url = process.env.CONNECTION_URL

const conection = async () => {
    try {
        
        await mongoose.connect(url)

        console.log("conectado a la base de datos")

    } catch (error) {
        
        console.error(error)
    }
}

export default conection;