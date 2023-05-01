import { Movie, MovieUpdateDTO, MovieWithoutIdDTO } from "../domain/Movie";
import { MovieRepository } from "../domain/MovieRepository";

export class MovieCrud {
  constructor(private readonly movieRepo: MovieRepository) {}

  async create(movie: MovieWithoutIdDTO): Promise<Movie> {
    return await this.movieRepo.add(movie);
  }

  async edit(id: number, updateMovie: MovieUpdateDTO): Promise<Movie> {
    return await this.movieRepo.edit(id, updateMovie);
  }

  async delete(id: number): Promise<void> {
    return await this.movieRepo.delete(id);
  }

  async getList(skip?: number, size?: number): Promise<Movie[] | null> {
    return await this.movieRepo.getList(skip, size);
  }

  async getById(id: number): Promise<Movie | null> {
    return await this.movieRepo.getById(id);
  }
}
