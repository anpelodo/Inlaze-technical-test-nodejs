import express from "express";

import { movieRouter } from "./movieRouter";
import { userRouter } from "./userRouter";

const apiRouter = express.Router();

apiRouter.use("/movies", movieRouter);
apiRouter.use("/users", userRouter);

export { apiRouter };
