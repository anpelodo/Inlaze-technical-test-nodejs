import { Crud } from "./Crud";
import { Movie } from "./Movie";

export interface MovieRepository extends Crud<Movie> {
  addCritic(movieId: number, critic: string): Promise<Movie>;
  editCritic(movieId: number, critic: string): Promise<Movie>;
  deleteCritic(movieId: number): Promise<void>;
  rateMovie(movieId: number, rate: number): Promise<Movie>;
  syncMovies(movies: Movie[]): Promise<void>;
}
