import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import { config } from "./config";
import { apiRouter } from "./infrastructure/routes";

function main() {
  const app = express();

  app.use(morgan("tiny"));
  app.use(cors());
  app.use(bodyParser.json());
  app.get("/health", (_req, res) => {
    res.status(200).send("ok");
  });
  app.use("/api", apiRouter);

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
    console.log(`http://localhost:${port}`);
  });
}

main();
