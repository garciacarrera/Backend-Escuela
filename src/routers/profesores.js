import { Router } from "express";
import { profesorController } from "../controllers/profesorControllers.js";

const router = Router();
router.get("/profesores", profesorController.getprofesor); 
export default router;