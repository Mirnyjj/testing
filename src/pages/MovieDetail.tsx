import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button, Card, Flex, Typography } from 'antd';
import { Loader } from '../components/Loader';
import { FavoriteIcon } from '../components/FavoriteIcon';
import { useAppSelector } from '../store/reducers/hooks';
import { selectMovies } from '../store/selectors/selector-movies';
import { Movie } from '../types/models';

const cardStyle: React.CSSProperties = {
  width: '90%',
};

const imgStyle: React.CSSProperties = {
  display: 'block',
  width: '50%',
};

export const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetail, setMovieDetail] = useState<Movie | null>(null);
  const movieStor = useAppSelector(selectMovies);

  useEffect(() => {
    if (id) {
      const movieFind = movieStor.find((movie) => movie.id === +id);
      if (movieFind) {
        setMovieDetail(movieFind);
      }
    }
  }, [id]);

  if (!movieDetail) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center mt-7">
      <Card
        style={cardStyle}
        styles={{ body: { padding: 0, overflow: 'hidden' } }}
        actions={[<FavoriteIcon movie={movieDetail} />]}
      >
        <Flex>
          {movieDetail.poster && (
            <img
              alt={movieDetail.alternativeName}
              src={movieDetail.poster?.url}
              style={imgStyle}
            />
          )}
          <Flex vertical align="flex-start" style={{ padding: 20 }}>
            <Typography.Title level={2}>
              {movieDetail.name || movieDetail.alternativeName}
            </Typography.Title>
            <Typography.Title level={4}>
              {`Дата выхода: ${movieDetail.year} год`}
            </Typography.Title>
            <Typography.Title level={4}>
              {`Рейтинг Кинопоиска: ${movieDetail.rating.kp}`}
            </Typography.Title>
            <Typography.Title level={4}>
              {`Жанры: ${movieDetail.genres.map((genr) => genr.name)}`}
            </Typography.Title>
            <Typography.Title level={5}>
              {movieDetail.description}
            </Typography.Title>
          </Flex>
        </Flex>
      </Card>
      <NavLink to={'/'} className="decoration-[none]">
        <Button type="link">Вернуться к списку фильмов</Button>
      </NavLink>
    </div>
  );
};
