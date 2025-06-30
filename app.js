import express from 'express';
import { envs } from './src/config/envs.js';

import matriculaRoutes from './src/routers/matriculas.js';
import { alumnoRouter } from './src/routers/alumnos.js';
import tareaRouter from './src/routers/tareas.js';
import materiaRouter from './src/routers/materias.js';
import profesorRouter from './src/routers/profesores.js'


const app = express();

app.use(express.json());
app.use(express.static('./src/public'));

app.set('port', envs.PORT);

// Rutas
app.use("/", tareaRouter);
app.use("/", materiaRouter);
app.use('/', matriculaRoutes);
app.use("/alumno", alumnoRouter)

app.use('/', profesorRouter)

app.use((req, res, next) => {
  res.status(404).json({ ok: false, msg: "Endpoint no encontrado" });
});

export default app;
