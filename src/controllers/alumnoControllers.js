import { request, response } from "express";
import { getConnection } from "../config/database.js";

// Obtener todas las materias donde un alumno está matriculado
const MateriasMatriculadas = async (req = request, res = response) => {
    const alumnoId = req.params.alumnoId;
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

// Subir entrega de tarea SOLO si el alumno está matriculado en la materia
const subirTarea = async (req, res) => {
  const alumnoId = req.params.alumnoId; // El id del alumno viene por la URL
  const { tareaId, fechaEntrega } = req.body || {};

  // Validación simple
  if (!tareaId || !fechaEntrega) {
    return res.status(400).json({ ok: false, msg: "Faltan datos en el body (tareaId, fechaEntrega)" });
  }

  try {
    const connection = await getConnection();

    // Verifica que la tarea existe y a qué materia pertenece
    const [tareaRows] = await connection.query(
      "SELECT materiaId FROM Tarea WHERE id = ?",
      [tareaId]
    );
    if (tareaRows.length === 0) {
      return res.status(404).json({ ok: false, msg: "La tarea no existe" });
    }
    const materiaId = tareaRows[0].materiaId;

    // Verifica matrícula
    const [matricula] = await connection.query(
      "SELECT * FROM Matricula WHERE alumnoId = ? AND materiaId = ?",
      [alumnoId, materiaId]
    );

    if (matricula.length === 0) {
      return res.status(403).json({ ok: false, msg: "No estás matriculado en esta materia" });
    }

    // Inserta la entrega de tarea
    await connection.query(
      "INSERT INTO entregatarea (tareaId, alumnoId, fechaEntrega) VALUES (?, ?, ?)",
      [tareaId, alumnoId, fechaEntrega]
    );
    res.status(201).json({ ok: true, msg: "Entrega de tarea subida correctamente" });
  } catch (err) {
    res.status(500).json({ ok: false, msg: "Error al subir entrega de tarea", error: err.message });
  }
};

export const alumnoController = {
    MateriasMatriculadas,
    subirTarea
};