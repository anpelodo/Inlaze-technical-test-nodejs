import { MovieRepository } from "../domain/MovieRepository";

export class MovieCritic {
  constructor(private readonly movieRepo: MovieRepository) {}

  async addCritic(movieId: number, critic: string, editorId: number) {
    const movie = await this.movieRepo.getById(movieId);

    if (movie?.editor?.id === editorId) {
      return null;
    }

    return await this.movieRepo.addCritic(movieId, critic);
  }

  async editCritic(movieId: number, critic: string, editorId: number) {
    const movie = await this.movieRepo.getById(movieId);

    if (movie?.editor?.id === editorId) {
      return null;
    }

    return await this.movieRepo.editCritic(movieId, critic);
  }

  async removeCritic(movieId: number, editorId: number) {
    const movie = await this.movieRepo.getById(movieId);

    if (movie?.editor?.id === editorId) {
      return null;
    }

    return await this.movieRepo.deleteCritic(movieId);
  }
}
