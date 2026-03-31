import express from "express";
import connectToDb from "./db.js";
import { URI, PORT } from "./lib/config.js";
import { userRouter } from "./routes/user.route.js";
import { projectRouter } from "./routes/project.route.js";
import { authRouter } from "./routes/auth.route.js";
import cors from "cors";
import {
  requestLogger,
  tokenExtractor,
  userExtractor,
} from "./lib/middlewares.js";
import path from "path";

async function main() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(requestLogger);

  app.use(express.static("dist"));

  app.use("/api/users", userRouter);

  const protectedRouter = express.Router();

  protectedRouter.use(tokenExtractor);
  protectedRouter.use("/auth", authRouter);

  protectedRouter.use(userExtractor);
  protectedRouter.use("/projects", projectRouter);

  app.use("/api", protectedRouter);

  app.use((req, res) => {
    res.sendFile(path.resolve("dist", "index.html"));
  });

  await connectToDb(URI);

  app.listen(PORT, () => {
    console.log(`server's running on http://localhost:${PORT}`);
  });
}

export default main;
