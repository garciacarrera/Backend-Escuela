import { Router } from "express";
import { tareaController } from "../controllers/tareaControllers.js";

const router = Router();

// Ruta para crear tarea (POST a /api/tareas)
router.post("/profesor/tareas", tareaController.crearTarea);
router.get("/:profesorId/entregas", tareaController.verEntregasDelProfesor);

export default router;