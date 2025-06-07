import express from 'express';
import { envs } from './src/config/envs.js';
import { profesorController } from './src/controllers/profesorControllers.js';


const app = express();




app.use(express.static('./src/public'));

app.set('port', envs.PORT);

app.get('/profesor', profesorController.getprofesor)
export default app;