import express from 'express';
import { envs } from './src/config/envs.js';
import { profesorController } from './src/controllers/profesorControllers.js';
import tareaRouter from './src/routers/tareas.js'; // Nota: debe ser tareas.js (plural)

const app = express();

app.use(express.json());
app.use(express.static('./src/public'));
app.set('port', envs.PORT);

// Rutas
app.get('/profesor', profesorController.getprofesor);
app.use("/tareas", tareaRouter);

app.use((req, res, next) => {
  res.status(404).json({ ok: false, msg: "Endpoint no encontrado" });
});

export default app;