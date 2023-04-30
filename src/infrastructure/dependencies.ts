import { PrismaClient } from "@prisma/client";

import { UserCrud } from "../application/UserCrud";
import { PrismaUserRepository } from "./PrismaUserRepository";
import { UserController } from "./UserController";

const prismaClient = new PrismaClient();

const userRepo = new PrismaUserRepository(prismaClient);
const userCrud = new UserCrud(userRepo);

export const userController = new UserController(userCrud);
