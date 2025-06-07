// src/controllers/profesorController.js
import { getConnection } from "../config/database.js";
import { request, response } from "express";

const getprofesor = async (req = request, res = response) => { 
    try { 
        const connection = await getConnection();
        
        // Corrección: solo necesitas el primer elemento del array
        const [profesores] = await connection.query('SELECT * FROM profesor');

        // Imprimir profesores en la consola
        console.log('Profesores obtenidos:', profesores);

        res.status(200).json({
            ok: true, 
            result: profesores, 
            msg: 'Profesores obtenidos exitosamente'
        });
    } catch(err) {
        console.error('Error al obtener profesores:', err);
        res.status(500).json({
            ok: false, 
            error: err.message, 
            msg: 'Error al obtener profesores'
        });
    }
}

export const profesorController = { getprofesor };