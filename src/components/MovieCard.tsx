import { Card } from 'antd';
import { Movie } from '../types/models';
import { NavLink } from 'react-router-dom';
import { FavoriteIcon } from './FavoriteIcon';

const { Meta } = Card;

type MovieCardProps = {
  movie: Movie;
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="relative">
      <NavLink
        key={movie.id}
        to={`/movie/${movie.id}`}
        className="decoration-[none]"
      >
        <Card
          className="w-[220px]"
          hoverable
          bordered={true}
          cover={
            <div className="h-[300px] !flex items-center justify-center">
              {movie.poster?.url ? (
                <img
                  alt={movie.alternativeName}
                  src={movie.poster.url}
                  className="h-[100%] w-[100%]"
                />
              ) : (
                <div>Постер отсутствует</div>
              )}
            </div>
          }
          actions={[<div className="h-5" />]}
        >
          <Meta
            title={movie.name || movie.alternativeName}
            description={`${movie.year ? movie.year : 0} | Рейтинг КП: ${movie.rating.kp ? movie.rating.kp : 0}`}
          />
        </Card>
      </NavLink>
      <FavoriteIcon movie={movie} />
    </div>
  );
};
