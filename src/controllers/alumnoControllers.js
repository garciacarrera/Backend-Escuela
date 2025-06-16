import { request, response } from "express";
import { getConnection } from "../config/database.js";

// Obtener todas las materias donde un alumno está matriculado
const MateriasMatriculadas = async (req = request, res = response) => {
    const alumnoId = req.user?.id || req.params.alumnoId || req.body.alumnoId;
    try {
        const connection = await getConnection();
        const [materias] = await connection.query(
            `SELECT m.id, m.nombre 
             FROM Materia m
             JOIN Matricula mat ON m.id = mat.materiaId
             WHERE mat.alumnoId = ?`, 
            [alumnoId]
        );
        res.status(200).json({ ok: true, materias });
    } catch (err) {
        res.status(500).json({
            ok: false, 
            error: err.message, 
            msg: 'Error al obtener materias'
        });
    }
};

// Subir tarea SOLO si el alumno está matriculado en la materia
const subirTarea = async (req, res) => {
  const alumnoId = req.params.alumnoId; // El id del alumno viene por la URL
  const { materiaId, titulo, descripcion, fechaEntrega } = req.body || {};

  // Validación simple
  if (!materiaId || !titulo || !descripcion || !fechaEntrega) {
    return res.status(400).json({ ok: false, msg: "Faltan datos en el body (materiaId, titulo, descripcion, fechaEntrega)" });
  }

  try {
    const connection = await getConnection();

    // Verifica matrícula
    const [matricula] = await connection.query(
      "SELECT * FROM Matricula WHERE alumnoId = ? AND materiaId = ?",
      [alumnoId, materiaId]
    );

    if (matricula.length === 0) {
      return res.status(403).json({ ok: false, msg: "No estás matriculado en esta materia" });
    }

    // Inserta la tarea
    await connection.query(
      "INSERT INTO Tarea (titulo, descripcion, fechaEntrega, alumnoId, materiaId) VALUES (?, ?, ?, ?, ?)",
      [titulo, descripcion, fechaEntrega, alumnoId, materiaId]
    );
    res.status(201).json({ ok: true, msg: "Tarea subida correctamente" });
  } catch (err) {
    res.status(500).json({ ok: false, msg: "Error al subir tarea", error: err.message });
  }
};

export const alumnoController = {
    
    subirTarea
};