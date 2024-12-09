import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { MovieDetailPage } from './pages/MovieDetail';
import { CreateMovies } from './pages/Create-movies';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
      <Route path="/create-movies" element={<CreateMovies />} />
    </Routes>
  );
};
