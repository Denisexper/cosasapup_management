import pegues from "../models/peguesComunidades.js";


class peguesControllers {

    async CrearPegue  (req,res)  {
        try {
            
            const { comunidad, dueño, direccion, estado, codigo, pago } = req.body;

            const pegue = await pegues.create({comunidad, dueño, direccion, estado, codigo, pago});


            res.status(200).send({
                message: "Registro creado correctamente",
                pegue
            })
        } catch (error) {

            res.status(500).send({
                message: "Error creando registro",
                error: error.message
            })
        }

    }

    async ObtenerPegues (req, res) {
        try {
            
            const todosPegues = await pegues.find();

            res.status(200).send({
                message: "Registros obtenidos con exito",
                todosPegues
            })
        } catch (error) {
            
            res.status(500).send({
                message: "Error obteniendo registros",
                error: error.message
            })
        }
    }

    async Obtenerpegue (req, res) {
        try {
            
            const { id } = req.params;

            const pegue = await pegues.findById(id)

            res.status(200).send({
                message: "registro obtenido con exito",
                pegue
            })
        } catch (error) {
            
            res.status(500).send({
                message: "Error obteniendo registro",
                error: error.message
            })
        }
    }

    async ActualizarPegue (req, res) {
        try {
            
            const { id } = req.params;

            const { comunidad, dueño, direccion, estado, codigo, pago } = req.body;

            const peActualizado = await pegues.findByIdAndUpdate(id, {comunidad, dueño, direccion, estado, codigo, pago}, {new: true});

            res.status(200).send({
                message: "Registro actualizado",
                peActualizado
            })
        } catch (error) {
            
            res.status(200).send({
                message: "Error actualizando el registro",
                error: error.message
            })
        }
    }

    async EliminarPegue (req, res) {
        try {
            
            const { id } = req.params;

            const eliminado = await pegues.findByIdAndDelete(id)

            res.status(200).send({
                message: "Registro actulizado correctamente",
                eliminado
            })
        } catch (error) {
            
            res.status(500).send({
                message: "Error eliminando registro",
                error: error.message
            })
        }
    }

}

export default peguesControllers;