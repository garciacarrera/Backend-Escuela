// src/controllers/materiaControllers.js
import { getConnection } from "../config/database.js";

const getAlumnosPorMateria = async (req, res) => {
    try {
    
        const { profesorId, materiaId } = req.body; 
        // { profesorId: 1, materiaId 1}
        const connection = await getConnection();

        // Verificar que la materia pertenece al profesor
        const [materias] = await connection.query(
            "SELECT * FROM Materia WHERE id = ? AND profesorId = ?",
            [materiaId, profesorId]
        );
        if (materias.length === 0) {
            return res.status(403).json({ ok: false, msg: "No tienes acceso a esta materia" });
        }

        // Obtener alumnos inscriptos
        const [alumnos] = await connection.query(
            `SELECT u.id, u.nombre, u.email
             FROM Usuario u
             JOIN Matricula m ON u.id = m.alumnoId
             WHERE m.materiaId = ?`, [materiaId]
        );

        res.json({ ok: true, alumnos });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
};

export const materiaController = { getAlumnosPorMateria };