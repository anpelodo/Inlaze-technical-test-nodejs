import { PrismaClient } from "@prisma/client";

import { MovieCritic } from "../application/MovieCritic";
import { MovieCrud } from "../application/MovieCrud";
import { UserCrud } from "../application/UserCrud";
import { MovieController } from "./MovieController";
import { PrismaMovieRepository } from "./PrismaMovieRepository";
import { PrismaUserRepository } from "./PrismaUserRepository";
import { UserController } from "./UserController";

const prismaClient = new PrismaClient();

const userRepo = new PrismaUserRepository(prismaClient);
const movieRepo = new PrismaMovieRepository(prismaClient);

const userCrud = new UserCrud(userRepo);
const movieCrud = new MovieCrud(movieRepo);
const movieCritic = new MovieCritic(movieRepo);

export const userController = new UserController(userCrud);
export const movieController = new MovieController(movieCrud, movieCritic);
