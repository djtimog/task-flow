import express from "express";
import connectToDb from "./db.js";
import { URI, PORT } from "./lib/config.js";
import { userRouter } from "./routes/user.route.js";
import { projectRouter } from "./routes/project.route.js";
import { authRouter } from "./routes/auth.route.js";
import cors from "cors";
import { requestLogger, tokenExtractor } from "./lib/middlewares.js";

async function main() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(requestLogger);

  app.use("/api/users", userRouter);
  app.use(tokenExtractor);
  app.use("/api/auth", authRouter);
  app.use("/api/projects", projectRouter);

  await connectToDb(URI);
  app.listen(PORT, () => {
    console.log(`server's running on http://localhost:${PORT}`);
  });
}

export default main;
