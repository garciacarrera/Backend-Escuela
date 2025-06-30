import express from 'express';
import { envs } from './src/config/envs.js';
import { profesorController } from './src/controllers/profesorControllers.js';
import matriculaRoutes from './src/routers/matriculas.js';


const app = express();




app.use(express.static('./src/public'));

app.use('/', matriculaRoutes);
app.set('port', envs.PORT);

app.get('/profesor', profesorController.getprofesor)
export default app;