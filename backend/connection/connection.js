import mongoose from "mongoose";

const url = "mongodb+srv://denis:FGIgxSiUaJKpOQI4@ddb.oljshlt.mongodb.net/COSASAPUP?retryWrites=true&w=majority&appName=DDB"

const conection = async () => {
    try {
        
        const conn = await mongoose.connect(url)

        console.log("conectado a la base de datos")

    } catch (error) {
        
        console.error(error)
    }
}

export default conection;