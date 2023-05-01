import { PrismaClient } from "@prisma/client";

import { Movie, MovieUpdateDTO, MovieWithoutIdDTO } from "../domain/Movie";
import { MovieRepository } from "../domain/MovieRepository";

export class PrismaMovieRepository implements MovieRepository {
  constructor(private readonly db: PrismaClient) {}

  async add(newMovie: MovieWithoutIdDTO): Promise<Movie> {
    const {
      title,
      imageUrl,
      language,
      description,
      rankingAvg,
      voteCount,
      genres,
      editor
    } = {
      ...newMovie
    };

    const genreCreator = genres.map((gen) => {
      return {
        genre: {
          connectOrCreate: {
            where: {
              id: gen.id
            },
            create: {
              name: gen.name,
              id: gen.id
            }
          }
        }
      };
    });

    try {
      const movie = await this.db.movie.create({
        data: {
          title,
          imageUrl,
          language,
          description,
          rankingAvg,
          voteCount,
          genres: {
            create: genreCreator
          },
          editor: {
            connect: {
              id: editor?.id
            }
          }
        },
        include: {
          genres: true,
          editor: true
        }
      });

      return movie as unknown as Movie;
    } catch (error) {
      return Promise.reject();
    }
  }

  async edit(id: number, partialMovie: MovieUpdateDTO): Promise<Movie> {
    const { title, imageUrl, language, description, rankingAvg, voteCount } = {
      ...partialMovie
    };

    try {
      const movie = await this.db.movie.update({
        where: {
          id: id
        },
        data: {
          title,
          imageUrl,
          language,
          description,
          rankingAvg,
          voteCount
        }
      });

      return movie as unknown as Movie;
    } catch (error) {
      return Promise.reject();
    }
  }

  async getById(id: number): Promise<Movie | null> {
    try {
      const movie = await this.db.movie.findUnique({
        where: {
          id
        }
      });

      return movie as unknown as Movie;
    } catch (error) {
      return Promise.reject();
    }
  }

  async getList(skip?: number, size?: number): Promise<Movie[]> {
    try {
      const movies = await this.db.movie.findMany({
        skip: skip,
        take: size
      });

      return movies as unknown as Movie[];
    } catch (error) {
      return Promise.reject();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.db.movie.delete({
        where: {
          id: id
        }
      });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  async addCritic(movieId: number, critic: string): Promise<Movie> {
    return await this.editCritic(movieId, critic);
  }

  async editCritic(movieId: number, critic: string): Promise<Movie> {
    try {
      const movie = await this.db.movie.update({
        where: { id: movieId },
        data: {
          critic: critic
        },
        include: {
          genres: true,
          editor: true
        }
      });

      return movie as unknown as Movie;
    } catch (error) {
      return Promise.reject();
    }
  }

  async deleteCritic(movieId: number): Promise<void> {
    try {
      await this.db.movie.update({
        where: { id: movieId },
        data: {
          critic: null
        },
        include: {
          genres: true,
          editor: true
        }
      });

      return;
    } catch (error) {
      return Promise.reject();
    }
  }

  async rateMovie(movieId: number, rate: number): Promise<Movie> {
    try {
      const movie = await this.db.movie.update({
        where: { id: movieId },
        data: {
          rankingAvg: rate,
          voteCount: {
            increment: 1
          }
        },
        include: {
          genres: true,
          editor: true
        }
      });

      return movie as unknown as Movie;
    } catch (error) {
      return Promise.reject();
    }
  }

  async syncMovies(_movies: Movie[]): Promise<void> {
    return Promise.resolve();
  }
}
