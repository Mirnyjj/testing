import { ACTION_TYPES } from './action-types';
import { ActionMovies, Movie } from '../../types/models';

export const setMoviesData = (MoviesData: Movie[]): ActionMovies => ({
  type: ACTION_TYPES.SET_MOVIES,
  payload: MoviesData,
});
