import { Router } from "express";
import { matriculaController } from "../controllers/matriculaControllers.js";

const matriculaRoutes = Router()

matriculaRoutes.get('/matricula',matriculaController.getMatricula)
matriculaRoutes.post('/matricula',matriculaController.createMatricula)
matriculaRoutes.patch('/matricula', matriculaController.updateMatricula)
matriculaRoutes.delete('/matricula/:id',matriculaController.deleteMatricula)

export default matriculaRoutes

