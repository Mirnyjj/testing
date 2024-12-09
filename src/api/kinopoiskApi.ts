import axios from 'axios';

const apiKey = 'VH0VDBF-WH1427S-NCM6DGK-BCKRVA3';

const BASE_URL = 'https://api.kinopoisk.dev/v1.4/movie';

export const fetchMovies = async (
  page: number,
  genres: string[],
  year: number | null,
  rating: number | null,
) => {
  const genreQuery =
    genres.length > 0
      ? `&genres.name=%2B${genres.join('&genres.name=%2B')}`
      : '';
  const yearQuery = year ? `&year=${year}` : '';
  const ratingKPQuery = rating ? `&rating.kp=${rating}` : '';
  try {
    const response = await axios.get(
      `${BASE_URL}?page=${page}&limit=21${ratingKPQuery}${genreQuery}${yearQuery}`,
      {
        headers: {
          'X-API-KEY': apiKey,
        },
      },
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Ошибка при запросе:', error.message);
      throw new Error(
        `Ошибка API: ${error.response?.data?.message || error.message}`,
      );
    } else {
      console.error('Неизвестная ошибка:', error);
      throw new Error('Произошла неизвестная ошибка');
    }
  }
};
