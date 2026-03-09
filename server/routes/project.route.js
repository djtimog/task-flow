import { Router } from "express";
import projectController from "../controllers/project.controller.js";

const router = Router();

router.get("/", projectController.getProjects);
router.post("/createProject", projectController.createProject);
router.get("/getUserProjects", projectController.getAllUserProjects);
router.get("/:id", projectController.getProjectById);
router.put("/:id", projectController.editProject);
router.delete("/:id", projectController.deleteProject);
router.post("/:id/invite", projectController.inviteToProject);

export const projectRouter = router;
