import { Router } from "express";
import authController from "../controllers/auth.controller.js";
const router = Router();

router.post("/register", authController.registerUser);
router.get("/register/confirmEmail/:token", authController.confirmEmail);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);
router.post("/refetchToken", authController.refetchToken);
router.post("/forgetPassword", authController.forgetPassword);
router.post("/resetPassword/:token", authController.resetPassword);

export const authRouter = router;
