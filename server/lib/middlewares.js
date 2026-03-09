import { getTokenFromAuth } from "./userHelper.js";
import logger from "./logger.js";

const requestLogger = (req, res, next) => {
  logger.info(`Method: ${req.method}`);
  logger.info(`Path: ${req.path}`);
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

export { requestLogger, tokenExtractor };
