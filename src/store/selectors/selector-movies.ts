import { Movie } from '../../types/models';

type Wrapper = {
  movies: Movie[];
};

export const selectMovies = ({ movies }: Wrapper) => movies;
