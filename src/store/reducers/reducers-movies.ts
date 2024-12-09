import { ActionMovies, Movie } from '../../types/models';
import { ACTION_TYPES } from '../action/action-types';

const initialMoviesState: Movie[] = [];

export const moviesReducer = (
  state = initialMoviesState,
  action: ActionMovies,
) => {
  switch (action.type) {
    case ACTION_TYPES.SET_MOVIES:
      return action.payload;
    default:
      return state;
  }
};
