import { getConnection } from "../config/database.js";
import { request, response } from "express";

const getMatricula = async (req = request, res = response) => { 
    try { 
        const connection = await getConnection();
        
        // Corrección: solo necesitas el primer elemento del array
        const [matriculas] = await connection.query('SELECT * FROM matricula');

        // Imprimir profesores en la consola
        console.log('Matriculas obtenidas:', matriculas);

        res.status(200).json({
            ok: true, 
            result: matriculas, 
            msg: 'Matriculas obtenidas'
        });
    } catch(err) {
        console.error('Error al obtener matriculas:', err);
        res.status(500).json({
            ok: false, 
            error: err.message, 
            msg: 'Error al obtener matriculas'
        });
    }
}

export const matriculaController = { getMatricula };