
import mysql from 'mysql2/promise';
import { envs } from './envs.js';

const connection = mysql.createConnection({
    user: envs.DB_USER,        
    database: envs.DATABASE,   
    host: envs.DB_HOST,        
    port: envs.DB_PORT,        
    
});

export const getConnection = () => {
    console.log("Conexión con éxito a la base de datos");
    return connection;
};