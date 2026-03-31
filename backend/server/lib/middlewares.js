import { getTokenFromAuth, getUserByToken } from "./userHelper.js";
import logger from "./logger.js";
import Project from "../models/project.model.js";

const PUBLIC_PATHS = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/forgetPassword",
  "/api/projects",
];

const PUBLIC_PATH_PREFIXES = [
  "/api/auth/resetPassword",
  "/api/auth/register/confirmEmail",
];

const isPublicPath = (path) =>
  PUBLIC_PATHS.includes(path) ||
  PUBLIC_PATH_PREFIXES.some((prefix) => path.startsWith(prefix));

const requestLogger = (req, res, next) => {
  logger.info(`Method: ${req.method}`);
  logger.info(`Path:   ${req.path}`);
  logger.info(`Params: ${JSON.stringify(req.params)}`);
  logger.info(`Body:   ${JSON.stringify(req.body ?? {})}`);
  logger.info("---");
  next();
};

const tokenExtractor = async (req, res, next) => {
  if (isPublicPath(req.originalUrl.split("?")[0])) {
    return next();
  }

  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(401).json({ error: "No authorization header" });
  }

  const token = getTokenFromAuth(auth);
  if (!token) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  req.body = req.body ?? {};
  req.body.token = token;

  next();
};

const userExtractor = async (req, res, next) => {
  if (isPublicPath(req.originalUrl.split("?")[0])) {
    return next();
  }

  try {
    const { token } = req.body;
    const user = await getUserByToken(token, res);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const projectExtractor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    req.project = project;
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export { requestLogger, tokenExtractor, userExtractor, projectExtractor };
