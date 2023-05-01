import { Request, Response } from "express";

import { MovieCritic } from "../application/MovieCritic";
import { MovieCrud } from "../application/MovieCrud";
import { MovieWithoutIdDTO } from "../domain/Movie";
import { CrudController } from "./CrudController";

export class MovieController implements CrudController {
  constructor(
    private readonly movieCrud: MovieCrud,
    private readonly movieCritic: MovieCritic
  ) {}

  async create(req: Request, res: Response) {
    const {
      title,
      imageUrl,
      description,
      rankingAvg,
      voteCount,
      language,
      genres,
      critic,
      editor
    } = { ...req.body } as MovieWithoutIdDTO;

    //TODO use validator

    const movie = await this.movieCrud
      .create({
        title,
        imageUrl,
        description,
        rankingAvg,
        voteCount,
        language,
        critic,
        genres,
        editor
      })
      .catch(() => res.status(500));

    res.status(201).send({
      movie
    });
  }

  async edit(req: Request, res: Response) {
    const { id } = req.params;
    const {
      title,
      imageUrl,
      description,
      rankingAvg,
      voteCount,
      language,
      critic,
      genres
    } = { ...req.body } as MovieWithoutIdDTO;

    //TODO use validator

    const movie = await this.movieCrud
      .edit(Number(id), {
        title,
        imageUrl,
        description,
        rankingAvg,
        voteCount,
        language,
        critic,
        genres
      })
      .catch(() => res.status(500));

    res.status(200).send({ movie });
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    //TODO use validator

    await this.movieCrud.delete(Number(id)).catch(() => res.status(500));

    res.status(200).send({
      id
    });
  }

  async getList(_req: Request, res: Response) {
    const list = await this.movieCrud.getList().catch(() => res.status(500));

    res.status(200).send(list);
  }

  async getById(req: Request, res: Response) {
    const id = req.params.id;

    //TODO use validator

    const movie = await this.movieCrud
      .getById(Number(id))
      .catch(() => res.status(500));

    if (!movie) {
      res.status(404);
    }

    res.status(200).send({
      movie
    });
  }

  async addCritic(req: Request, res: Response) {
    const movieId = req.params.movieId;

    const { critic, editorId } = req.body;

    const movie = await this.movieCritic
      .addCritic(Number(movieId), critic, editorId)
      .catch(() => res.status(500));

    if (movie === null) {
      res.status(400).send();
    }

    res.status(201).send({ movie });
  }

  async editCritic(req: Request, res: Response) {
    const movieId = req.params.movieId;

    const { critic, editorId } = req.body;

    const movie = await this.movieCritic
      .editCritic(Number(movieId), critic, editorId)
      .catch(() => res.status(500));

    if (movie === null) {
      res.status(400).send();
    }

    res.status(200).send({ movie });
  }

  async deleteCritic(req: Request, res: Response) {
    const movieId = req.params.movieId;

    const { editorId } = req.body;

    const movie = await this.movieCritic
      .removeCritic(Number(movieId), editorId)
      .catch(() => res.status(500));

    if (movie === null) {
      res.status(400).send();
    }

    res.status(200).send({ movie });
  }
}
