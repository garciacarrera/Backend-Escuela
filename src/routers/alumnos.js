import { Router } from "express";
import { alumnoController } from "../controllers/alumnoControllers.js";
const alumnoRouter = Router();

alumnoRouter.post("/:alumnoId/tarea", alumnoController.subirTarea );
alumnoRouter.get('/:alumnoId', alumnoController.MateriasMatriculadas)

export {alumnoRouter};