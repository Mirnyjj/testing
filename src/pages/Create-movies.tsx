import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Movie } from '../types/models';
import { useAppDispatch } from '../store/reducers/hooks';
import { useSelector } from 'react-redux';
import { selectMovies } from '../store/selectors/selector-movies';
import { setMoviesData } from '../store/action/set-movies';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const currentYear = new Date().getFullYear();
const yearRegex = /^(199[0-9]|20[0-2][0-9]|20[3-9][0-9])$/;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const authFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('Введите название фильма')
    .min(10, 'Неверно заполнено название. Минимум 10 символов')
    .max(20, 'Неверно заполнено название. Максимум 20 символов'),
  year: yup
    .number()
    .required('Введите год выхода фильма')
    .test(
      'is-valid-year',
      'Неверно указан год выхода фильма, год должен быть в промежутке от 1990 до текущего года',
      (value) => {
        if (value) {
          return yearRegex.test(value.toString());
        }
        return false;
      },
    )
    .min(1990, 'Год должен быть не меньше 1990')
    .max(currentYear, `Год должен быть не больше ${currentYear}`),
  rating: yup
    .number()
    .required('Введите рейтинг')
    .min(0, 'Рейтинг должен быть не меньше 0')
    .max(10, 'Рейтинг должен быть не больше 10'),
  imgUrl: yup.string().required('Введите URL изображения'),
  description: yup
    .string()
    .required('Введите описание')
    .min(10, 'Неверно заполнено описание. Допускается не менее 10 символов')
    .max(100, 'Неверно заполнено описание. Допускается не более 100 символов'),
  genres: yup
    .array()
    .of(yup.string().required('Выберите жанр'))
    .required('Выберите жанр')
    .min(1, 'Неверно заполнен Жанр. Допускается не менее 1 жанра')
    .max(3, 'Неверно заполнен Жанр. Допускается не более 3 жанров'),
});

export const CreateMovies = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      year: 0,
      name: '',
      rating: 0,
      imgUrl: '',
      description: '',
      genres: [],
    },
    resolver: yupResolver(authFormSchema),
  });

  const dispatch = useAppDispatch();
  const moviesStor = useSelector(selectMovies);
  const navigate = useNavigate();

  const onSubmit = (data: {
    name: string;
    year: number;
    rating: number;
    imgUrl: string;
    description: string;
    genres: string[];
  }) => {
    const newMovie: Movie = {
      id: Math.floor(100 + Math.random() * 900),
      alternativeName: data.name,
      name: data.name,
      poster: {
        url: data.imgUrl,
      },
      year: data.year,
      rating: {
        kp: data.rating,
      },
      genres: data.genres.map((genre) => ({ name: genre })),
      description: data.description,
    };
    dispatch(setMoviesData([...moviesStor, newMovie]));
    reset({
      year: 0,
      name: '',
      rating: 0,
      imgUrl: '',
      description: '',
      genres: [],
    });
    navigate('/');
  };

  return (
    <Form
      {...formItemLayout}
      onFinish={handleSubmit(onSubmit)}
      className="max-w-[600px] mt-5"
    >
      <Form.Item
        label="Название фильма"
        validateStatus={errors.name ? 'error' : ''}
        help={errors.name?.message}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Год выхода фильма"
        validateStatus={errors.year ? 'error' : ''}
        help={errors.year?.message}
      >
        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <InputNumber {...field} style={{ width: '100%' }} />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Рейтинг"
        validateStatus={errors.rating ? 'error' : ''}
        help={errors.rating?.message}
      >
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <InputNumber {...field} style={{ width: '100%' }} />
          )}
        />
      </Form.Item>

      <Form.Item
        label="URL изображения"
        validateStatus={errors.imgUrl ? 'error' : ''}
        help={errors.imgUrl?.message}
      >
        <Controller
          name="imgUrl"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Описание"
        validateStatus={errors.description ? 'error' : ''}
        help={errors.description?.message}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => <Input.TextArea {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Жанр"
        validateStatus={errors.genres ? 'error' : ''}
        help={errors.genres?.message}
      >
        <Controller
          name="genres"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              mode="multiple"
              placeholder="Выберите жанр"
              style={{ width: '100%' }}
            >
              <Select.Option value="мультфильм">Мультфильм</Select.Option>
              <Select.Option value="боевик">Боевик</Select.Option>
              <Select.Option value="фантастика">Фантастика</Select.Option>
              <Select.Option value="комедия">Комедия</Select.Option>
              <Select.Option value="мелодрамма">Мелодрамма</Select.Option>
              <Select.Option value="ужасы">Ужасы</Select.Option>
            </Select>
          )}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
