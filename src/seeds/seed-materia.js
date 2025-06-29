// seeds/seed-materia.js
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// Conexión a la base
const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

conexion.connect((err) => {
  if (err) {
    console.error(' Error al conectar a la base de datos:', err);
    return;
  }

  console.log(' Conectado a la base de datos.');

  // 1. Buscar un profesor existente
  const buscarProfesor = 'SELECT id FROM Usuario WHERE rol = "profesor" LIMIT 1';

  conexion.query(buscarProfesor, (err, resultados) => {
    if (err || resultados.length === 0) {
      console.error(' No se encontró ningún profesor en la base de datos.');
      conexion.end();
      return;
    }

    const profesorId = resultados[0].id;
    console.log(` Usando profesor con ID: ${profesorId}`);

    // 2. Insertar materias para ese profesor
    const materias = [
      ['Programación I', profesorId],
      ['Matemática Discreta', profesorId],
      ['Base de Datos', profesorId],
      ['Inglés Técnico', profesorId]
    ];

    const insertQuery = 'INSERT INTO Materia (nombre, profesorId) VALUES ?';

    conexion.query(insertQuery, [materias], (err, result) => {
      if (err) {
        console.error(' Error al insertar materias:', err);
      } else {
        console.log(` ${result.affectedRows} materias insertadas con éxito.`);
      }
      conexion.end();
    });
  });
});
