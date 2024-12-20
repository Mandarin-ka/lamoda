import fs from 'fs';
import path from 'path';

export const PRODUCT_CATEGORIES = [
  'электроника',
  'одежда',
  'книги',
  'игрушки',
  'мебель',
  'спорт',
  'продукты питания',
  'косметика',
  'автомобильные принадлежности',
  'инструменты',
];

export const PRODUCT_COLORS = [
  'желтый',
  'голубой',
  'оранжевый',
  'фиолетовый',
  'зеленый',
];

const imagesDirectory = path.join(__dirname, '../../public/images');

export const PRODUCT_IMAGES = fs
  .readdirSync(imagesDirectory)
  .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file));

export enum SortType {
  priceAsc = 'price-asc',
  priceDesc = 'price-desc',
  ratingDesc = 'rating-desc',
}

export const AVAILABLE_SORT: { name: string; key: SortType }[] = [
  {
    name: 'Сначала дешевые',
    key: SortType.priceAsc,
  },
  {
    name: 'Сначала дорогие',
    key: SortType.priceDesc,
  },
  {
    name: 'Сначала популярные',
    key: SortType.ratingDesc,
  },
];
