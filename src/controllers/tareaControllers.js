import { getConnection } from "../config/database.js";

const crearTarea = async (req, res) => {
    try {
        const { titulo, descripcion, fechaEntrega, materiaId, profesorId } = req.body;

        const connection = await getConnection();

        // Validar que el profesor es responsable de la materia
        const [materias] = await connection.query(
            "SELECT * FROM Materia WHERE id = ? AND profesorId = ?",
            [materiaId, profesorId]
        );

        if (materias.length === 0) {
            return res.status(403).json({
                ok: false,
                msg: "El profesor no está asignado a esta materia."
            });
        }

        // Crear la tarea
        await connection.query(
            "INSERT INTO Tarea (titulo, descripcion, fechaEntrega, materiaId) VALUES (?, ?, ?, ?)",
            [titulo, descripcion, fechaEntrega, materiaId]
            /**
             * { refernecia de como cargar tareas 
                    "titulo": "Tarea de Matemáticas",
                    "descripcion": "Resolver los problemas del capítulo 3",
                    "fechaEntrega": "2025-06-25",
                    "materiaId": 1,
                    "profesorId": 5
}
             */
        );

        res.status(201).json({
            ok: true,
            msg: "Tarea creada correctamente"
        });
    } catch (err) {
        console.error("Error al crear tarea:", err);
        res.status(500).json({
            ok: false,
            error: err.message,
            msg: "Error al crear tarea"
        });
    }
};

export const tareaController = { crearTarea };