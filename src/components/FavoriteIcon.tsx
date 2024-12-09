import { useEffect, useState } from 'react';
import { HeartOutlined, HeartFilled, DeleteFilled } from '@ant-design/icons';
import { Movie } from '../types/models';
import { useLocalStorage } from '@uidotdev/usehooks';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../store/reducers/hooks';
import { selectMovies } from '../store/selectors/selector-movies';
import { setMoviesData } from '../store/action/set-movies';
import { useParams } from 'react-router-dom';

type FavoriteIconProps = {
  movie: Movie;
};

export const FavoriteIcon = ({ movie }: FavoriteIconProps) => {
  const [favoritesMovie, setFavoritesMovie] = useLocalStorage<Movie[]>(
    'myFavoritesMovies',
    [],
  );
  const dispatch = useAppDispatch();
  const moviesStor = useAppSelector(selectMovies);
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const findFavoritesMovieAdd = (movieId: number) => {
      const findMovie = favoritesMovie.some((el) => el.id === movieId);
      setIsFavorite(findMovie);
      return findMovie;
    };

    findFavoritesMovieAdd(movie.id);
  }, [favoritesMovie, movie.id]);

  const deleteMovie = (idDeleteMovie: number, movies: Movie[]) => {
    dispatch(
      setMoviesData(movies.filter((movie) => movie.id !== idDeleteMovie)),
    );
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavoritesMovie(favoritesMovie.filter((el) => el.id !== movie.id));
    } else {
      setFavoritesMovie([...favoritesMovie, movie]);
    }
  };

  return id ? null : (
    <div className="flex gap-4 absolute -m-10 left-[50%]">
      <Button
        onClick={toggleFavorite}
        icon={
          isFavorite ? (
            <HeartFilled className="text-[red]" />
          ) : (
            <HeartOutlined />
          )
        }
      />
      <Button
        onClick={() => deleteMovie(movie.id, moviesStor)}
        icon={<DeleteFilled />}
      />
    </div>
  );
};
