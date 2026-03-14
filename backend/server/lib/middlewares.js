import { getTokenFromAuth, getUserByToken } from "./userHelper.js";
import logger from "./logger.js";
import Project from "../models/project.model.js";

const requestLogger = (req, res, next) => {
  logger.info(`Method: ${req.method}`);
  logger.info(`Path: ${req.path}`);
  logger.info(`Params: ${JSON.stringify(req.params)}`);
  logger.info(`Body: ${JSON.stringify(req.body)}`);
  logger.info("---");
  next();
};

const tokenExtractor = async (req, res, next) => {
  const path = req.path;
  const tokenUnUsedPath = [
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/forgetPassword",
    "/api/projects",
  ];

  if (
    !tokenUnUsedPath.includes(path) &&
    !path.startsWith("/api/auth/resetPassword") &&
    !path.startsWith("/api/auth/register/confirmEmail")
  ) {
    const auth = req.headers["authorization"];
    if (!auth) {
      return res.status(401).json({ error: "No authorization header" });
    }

    const token = getTokenFromAuth(auth);
    if (!token) {
      return res.status(401).json({ error: "Invalid token format" });
    }
    if (!req.body) {
      req.body = {};
    }
    req.body.token = token;
  }

  next();
};

const userExtractor = async (req, res, next) => {
  if (req.path !== "/api/projects") {
    const { token } = req.body;

    const user = await getUserByToken(token, res);
    req.user = user;
  }
  next();
};

const projectExtractor = async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({ error: "project not found" });
  }

  req.project = project;

  next();
};

export { requestLogger, tokenExtractor, userExtractor, projectExtractor };
