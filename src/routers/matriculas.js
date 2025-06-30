import { Router } from "express";
import { matriculaController } from "../controllers/matriculaControllers";

const matriculaRoutes = Router()

matriculaRoutes.get('/matricula',matriculaController.getMatricula)
matriculaRoutes.post('/matricula',matriculaController.createMatricula)
matriculaRoutes.patch('/matricula')
matriculaRoutes.delete('/matricula/:id')

export default matriculaRoutes