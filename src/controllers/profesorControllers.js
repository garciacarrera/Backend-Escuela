
import { getConnection } from "../config/database.js";
import express from "express"


const getprofesor = async (req, res) => {
    try {
        const connection = await getConnection();

        // Solo trae usuarios con el rol 'profesor'
        const [profesores] = await connection.query(
            "SELECT * FROM Usuario WHERE rol = 'profesor'"
        );

        res.status(200).json({
            ok: true,
            result: profesores,
            msg: "Profesores obtenidos exitosamente"
        });
    } catch (err) {
        console.error("Error al obtener profesores:", err);
        res.status(500).json({
            ok: false,
            error: err.message,
            msg: "Error al obtener profesores"
        });
    }
};

export const profesorController = { getprofesor };