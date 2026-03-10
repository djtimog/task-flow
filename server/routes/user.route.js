import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.patch("/:id", userController.updateProfile);

export const userRouter = router;
