import mongoose, { Schema } from "mongoose";

const peguesSchema = new mongoose.Schema({
    comunidad: {
      type: String,
      required: true,
      trim: true
    },
    dueño: {
      type: String,
      required: true,
      trim: true
    },
    direccion: {
      type: String,
      required: true,
      trim: true
    },
    estado: {
      type: Boolean,
      default: true,
      required: true,
    },
    codigo: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },

    pago: {
      type: String,
      trim: true
    }
  });

const pegues = mongoose.model("pegues", peguesSchema)
export default pegues;
