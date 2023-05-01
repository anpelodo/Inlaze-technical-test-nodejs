import express from "express";

import { movieController } from "../dependencies";

const movieRouter = express.Router();

movieRouter.get("/list", movieController.getList.bind(movieController));
movieRouter.get("/movie/:id", movieController.getById.bind(movieController));
movieRouter.post("/movie", movieController.create.bind(movieController));
movieRouter.delete("/movie/:id", movieController.delete.bind(movieController));
movieRouter.patch("/movie/:id", movieController.edit.bind(movieController));
movieRouter.post(
  "/critic/:movieId",
  movieController.addCritic.bind(movieController)
);
movieRouter.patch(
  "/critic/:movieId",
  movieController.editCritic.bind(movieController)
);
movieRouter.delete(
  "/critic/:movieId",
  movieController.deleteCritic.bind(movieController)
);

export { movieRouter };
