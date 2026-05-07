const service = require("../services/medications.service");

// GET ALL
exports.getAll = async (req, res) => {
    try {
        const data = await service.getAll(req.userId);

        res.json({
            message: "Medicamentos del usuario",
            data
        });
    } catch (error) {
        res.status(500).json({ error: "Error interno" });
    }
};

// GET BY ID
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;

        const medication = await service.getById(req.userId, id);

        if (!medication) {
            return res.status(404).json({ error: "Not found" });
        }

        res.json(medication);
    } catch (error) {
        res.status(500).json({ error: "Error interno" });
    }
};

// CREATE
exports.create = async (req, res) => {
    try {
        const { nombre, dosis } = req.body;

        if (!nombre || !dosis) {
            return res.status(400).json({
                error: "datos faltantes"
            });
        }

        const newMedication = await service.create(req.userId, {
            nombre,
            dosis
        });

        res.status(201).json({
            message: "Creado con Exito",
            data: newMedication
        });

    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// UPDATE
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, dosis } = req.body;

        const updated = await service.update(req.userId, id, {
            nombre,
            dosis
        });

        res.json({
            message: "Actualizado con Exito",
            data: updated
        });

    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// DELETE
exports.remove = async (req, res) => {
    try {
        const { id } = req.params;

        await service.remove(req.userId, id);

        res.json({
            message: "Eliminado con Exito"
        });

    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

//hace que el controlador reciba las peticiones y las envie al servicio