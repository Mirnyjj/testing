import { useLocalStorage } from '@uidotdev/usehooks';
import { MovieList } from './MovieList';
import { Movie } from '../types/models';
import { Button, Flex, Typography } from 'antd';

type Props = {
  setMovieFavorites: (arg: boolean) => void;
};

export const FavoritesMovies = ({ setMovieFavorites }: Props) => {
  const [favoritesMovie] = useLocalStorage<Movie[]>('myFavoritesMovies', []);
  const handleNavigateToMovieList = () => setMovieFavorites(false);

  return (
    <div className="flex flex-col items-center g-[10px] m-5">
      {favoritesMovie.length === 0 ? (
        <Typography.Title level={1}>
          Фильмы еще не добавлены в "Избранное"
        </Typography.Title>
      ) : (
        <MovieList movies={favoritesMovie} />
      )}
      <Flex vertical gap="small" className="w-[60%]">
        <Button block onClick={handleNavigateToMovieList}>
          Вернуться к списку фильмов
        </Button>
      </Flex>
    </div>
  );
};
