import { Router } from "express";
import { tareaController } from "../controllers/tareaControllers.js";

const router = Router();

// Ruta para crear tarea (POST a /api/tareas)
router.post("/tareas", tareaController.crearTarea);

export default router;