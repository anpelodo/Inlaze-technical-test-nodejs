import { Genre } from "./Genre";
import { User } from "./User";

export class Movie {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly imageUrl: string,
    readonly language: string,
    readonly description: string,
    readonly genres: Genre[],
    readonly rankingAvg: number,
    readonly voteCount: number,
    readonly editor?: User,
    readonly critic?: string | null
  ) {}
}

export type MovieWithoutIdDTO = Omit<Movie, "id">;
export type MovieUpdateDTO = Partial<MovieWithoutIdDTO>;
