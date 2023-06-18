import express from "express";
import { checkPin, checkRegister } from "../middlewares/authMiddleware.js";
import { userRegister } from "../controllers/userControllers.js";
import { addProduct, checkAPI } from "../controllers/prodController.js";

const router = express.Router();

router.post("/register", checkRegister, userRegister); // => Registration
router.post("/addProduct", checkPin, addProduct); // => Add Products


router.get("/check", checkAPI);

export default router;