import { Router } from "express";
import projectController from "../controllers/project.controller.js";
import { projectExtractor } from "../lib/middlewares.js";

const router = Router();

router.get("/", projectController.getProjects);
router.post("/createProject", projectController.createProject);
router.get("/getUserProjects", projectController.getAllUserProjects);
router.get("/:id", projectExtractor, projectController.getProjectById);
router.put("/:id", projectExtractor, projectController.editProject);
router.delete("/:id", projectExtractor, projectController.deleteProject);
router.post("/:id/invite", projectExtractor, projectController.inviteToProject);
router.get(
  "/:id/acceptInvite/:token",
  projectExtractor,
  projectController.acceptInviteToProject,
);
export const projectRouter = router;
