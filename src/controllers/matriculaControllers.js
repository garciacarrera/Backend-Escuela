import { getConnection } from "../config/database.js";
import { request, response } from "express";

const getMatricula = async (req = request, res = response) => { 
    try { 
        const connection = await getConnection();
        
        //Consulta para obtener las matriculas de la base de datos
        const [matriculas] = await connection.query('SELECT * FROM matricula');

        // Imprimir matriculas
        console.log('Matriculas obtenidas:', matriculas);

        //Mensaje de exito
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

//Funcion para crear una matricula en la base de datos
const createMatricula = async (req = request, res = response) => {
    try{
    //Desectructuracion de objeto
    const { alumnoId , materiaId } = req.body
    const connection = await getConnection()

    //Recibimos respuesta de una consulta SQL mandada a la base de datos
    const [alumno] = await connection.query(
        'INSERT INTO matricula(alumnoId,materiaId) VALUES (?,?)',
        [ alumnoId,materiaId ]
    ) ;

    //Mensaje de exito
    res.status(201).json({ok:true, result:alumno, msg:'Matricula creada con exito'})
    } catch(error){
        console.error('Error al crear matricula:', err);
        res.status(500).json({
            ok: false, 
            error: err.message, 
            msg: 'Error al crear matricula'
        });
    }
}

const deleteMatricula = async (req = request, res = response) =>{}

const updateMatricula = async (req = request, res = response) => {}

export const matriculaController = { getMatricula, createMatricula, updateMatricula, deleteMatricula };