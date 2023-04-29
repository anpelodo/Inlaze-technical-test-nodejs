import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import bodyParser from "body-parser";
import express from "express";

import { config } from "./config";

function main() {
  const app = express();

  app.use(bodyParser.json());
  app.use("/**", (_req, res) => {
    res.status(200).send("<h1>it works!</h1>");
  });

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
    console.log(`http://localhost:${port}`);
  });
}

main();
