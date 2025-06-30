    import express from 'express';
    import { envs } from './src/config/envs.js';
    import { profesorController } from './src/controllers/profesorControllers.js';
    import { alumnoRouter } from './src/routers/alumnos.js';
    import { alumnoController } from './src/controllers/alumnoControllers.js';


    const app = express();



    app.use(express.json());
    app.use(express.static('./src/public'));
    app.get("/alumno/:alumnoId",alumnoController.MateriasMatriculadas)
    app.set('port', envs.PORT);

    app.get('/profesor', profesorController.getprofesor)

    export default app;

