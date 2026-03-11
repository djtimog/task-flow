import { Router } from "express";
import projectController from "../controllers/project.controller.js";
import { projectExtractor } from "../lib/middlewares.js";
import taskController from "../controllers/task.controller.js";
import commentController from "../controllers/comment.controller.js";

const router = Router();

router.get("/", projectController.getProjects);
router.post("/createProject", projectController.createProject);
router.get("/getUserProjects", projectController.getAllUserProjects);
router.get("/:id", projectExtractor, projectController.getProjectById);
router.put("/:id", projectExtractor, projectController.editProject);
router.delete("/:id", projectExtractor, projectController.deleteProject);
router.post("/:id/invite", projectExtractor, projectController.inviteToProject);
router.post(
  "/:id/acceptInvite/:token",
  projectExtractor,
  projectController.acceptInviteToProject,
);
router.post("/:id/createTask", projectExtractor, taskController.createTask);
router.post(
  "/:id/createComment",
  projectExtractor,
  commentController.createComment,
);
router.patch(
  "/:id/updateTaskStatus",
  projectExtractor,
  taskController.updateTaskStatus,
);
export const projectRouter = router;
