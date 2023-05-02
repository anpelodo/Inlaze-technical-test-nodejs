import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import cors from "cors";
import express from "express";
import morgan from "morgan";
import swaggerJSDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { config } from "./config";
import { apiRouter } from "./infrastructure/routes";

function main() {
  const app = express();
  const swaggerSpec: Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Movie admin",
        version: "1.0.0"
      }
    },
    apis: ["./infrastructure/routes/*.ts"]
  };

  app.use(morgan("tiny"));
  app.use(cors());
  app.use(express.json());
  app.get("/health", (_req, res) => {
    res.status(200).send("ok");
  });

  app.use("/api", apiRouter);
  app.use(
    "/api-doc",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJSDoc(swaggerSpec))
  );

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
    console.log(`http://localhost:${port}`);
  });
}

main();
