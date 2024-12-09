import { MovieCard } from './MovieCard';
import { Pagination } from 'antd';
import { Loader } from './Loader';
import { Movie } from '../types/models';

type Props = {
  page?: number;
  setPage?: (page: number) => void;
  movies: Movie[];
  loading?: boolean;
  totalMovies?: number;
};

export const MovieList = ({
  page = 1,
  setPage,
  movies,
  totalMovies,
  loading,
}: Props) => {
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-around">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {setPage && (
        <Pagination
          current={page}
          total={totalMovies}
          onChange={(page) => setPage(page)}
        />
      )}
    </>
  );
};
