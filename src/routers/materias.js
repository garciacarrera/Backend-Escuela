import { Router } from "express";
import { materiaController } from "../controllers/materiaControllers.js";

const router = Router();

// GET /materias/:materiaId/alumnos
router.get("/materia/alumnos", materiaController.getAlumnosPorMateria);

export default router;