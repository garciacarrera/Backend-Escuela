import express from 'express';
import { envs } from './src/config/envs.js';
import { profesorController } from './src/controllers/profesorControllers.js';
import matriculaRoutes from './src/routers/matriculas.js';


const app = express();

import tareaRouter from './src/routers/tareas.js';
import materiaRouter from './src/routers/materias.js';


const app = express();

app.use(express.json());
app.use(express.static('./src/public'));

app.use('/', matriculaRoutes);

app.set('port', envs.PORT);

// Rutas
app.use("/", tareaRouter);
app.use("/", materiaRouter);

app.use((req, res, next) => {
  res.status(404).json({ ok: false, msg: "Endpoint no encontrado" });
});

export default app;