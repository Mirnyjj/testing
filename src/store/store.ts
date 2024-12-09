import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { moviesReducer } from './reducers/reducers-movies';

const rootReducer = combineReducers({
  movies: moviesReducer,
});
export function setupStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
