import express from "express";

import { userController } from "../dependencies";

const userRouter = express.Router();

userRouter.get("/list", userController.getList.bind(userController));
userRouter.get("/user/:id", userController.getById.bind(userController));
userRouter.post("/user", userController.create.bind(userController));
userRouter.delete("/user/:id", userController.delete.bind(userController));
userRouter.patch("/user/:id", userController.edit.bind(userController));

export { userRouter };
