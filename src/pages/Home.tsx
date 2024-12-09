import { useCallback, useEffect, useState } from 'react';
import { MovieList } from '../components/MovieList';
import { fetchMovies } from '../api/kinopoiskApi';
import { Button, InputNumber, Select } from 'antd';
import { debounce } from '../utils/debounce';
import { FetchFilteredMoviesParams } from '../types/models';
import { useAppDispatch, useAppSelector } from '../store/reducers/hooks';
import { selectMovies } from '../store/selectors/selector-movies';
import { setMoviesData } from '../store/action/set-movies';
import { FavoritesMovies } from '../components/FavoritesMovies';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [page, setPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(1);
  const [genres, setGenres] = useState<string[]>([]);
  const [year, setYear] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [movieFavorites, setMovieFavorites] = useState(false);
  const handleMovieFavoritesChange = () => setMovieFavorites(true);

  const dispatch = useAppDispatch();
  const moviesStor = useAppSelector(selectMovies);
  const navigate = useNavigate();

  const fetchFilteredMovies = async ({
    page,
    genres,
    year,
    rating,
  }: FetchFilteredMoviesParams) => {
    setLoading(true);
    const response = await fetchMovies(page, genres, year, rating);
    setTotalMovies(response.data.total);
    dispatch(setMoviesData(response.data.docs));
    setLoading(false);
  };
  useEffect(() => {
    fetchFilteredMovies({
      page,
      genres,
      year,
      rating,
    });
  }, [page, shouldSearch]);

  const startDelayedSearch = useCallback(
    debounce((value: boolean) => {
      setShouldSearch(value);
    }, 2000),
    [],
  );

  const reset = () => {
    setPage(1);
    startDelayedSearch(!shouldSearch);
  };

  const handleGenreChange = (value: string[]) => {
    setGenres(value);
    reset();
  };

  const handleYearChange = (value: number | null) => {
    setYear(value);
    reset();
  };

  const handleRatingChange = (value: number | null) => {
    setRating(value);
    reset();
  };

  const handleCreateMovies = () => navigate('/create-movies');

  return (
    <div className="flex flex-col items-center gap-2 m-5">
      <div className="mb-4 flex flex-wrap gap-2 w-[70%]">
        <Select
          mode="multiple"
          className="w-[350px] mr-4"
          placeholder="Выберите жанр"
          onChange={handleGenreChange}
        >
          <Select.Option value="мультфильм">Мультфильм</Select.Option>
          <Select.Option value="боевик">Боевик</Select.Option>
          <Select.Option value="фантастика">Фантастика</Select.Option>
          <Select.Option value="комедия">Комедия</Select.Option>
          <Select.Option value="мелодрамма">Мелодрамма</Select.Option>
          <Select.Option value="ужасы">Ужасы</Select.Option>
        </Select>
        <InputNumber
          min={1990}
          max={new Date().getFullYear()}
          placeholder="Год"
          className="mr-4"
          onChange={handleYearChange}
        />
        <InputNumber
          min={1}
          max={10}
          placeholder="Рейтинг"
          className="mr-4 w-[100px]"
          onChange={handleRatingChange}
        />
        <Button onClick={handleMovieFavoritesChange} className="w-[300px]">
          "Избранное"
        </Button>
        <Button onClick={handleCreateMovies} className="w-[300px]">
          Создание карточки фильма
        </Button>
      </div>
      {movieFavorites ? (
        <FavoritesMovies setMovieFavorites={setMovieFavorites} />
      ) : (
        <MovieList
          page={page}
          setPage={setPage}
          movies={moviesStor}
          loading={loading}
          totalMovies={totalMovies}
        />
      )}
    </div>
  );
};
