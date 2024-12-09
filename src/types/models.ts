export type Movie = {
  id: number;
  alternativeName: string;
  name: string;
  poster?: {
    url: string;
  };
  year: string | number;
  rating: {
    kp: number;
  };
  genres: {
    name: string;
  }[];
  description: string;
};

export type FetchFilteredMoviesParams = {
  page: number;
  genres: string[];
  year: number | null;
  rating: number | null;
};
export type CreateMovie = {
  year: number | string;
  name: string;
  rating: number;
  imgUrl: string;
  description: string;
  genres: {
    name: string;
  }[];
};
export type Action = {
  type: string;
};

export type ActionMovie = {
  type: string;
  payload: Movie;
};
export type ActionMovies = {
  type: string;
  payload: Movie[];
};
