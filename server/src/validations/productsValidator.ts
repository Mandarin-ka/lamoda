import * as yup from 'yup';
import {
  AVAILABLE_SORT,
  PRODUCT_CATEGORIES,
  PRODUCT_COLORS,
  PRODUCT_IMAGES,
} from '../constants';

export const productSchema = yup.object({
  id: yup.string(),
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().min(10).max(9999).required(),
  imageUrl: yup.mixed().oneOf(PRODUCT_IMAGES).required(),
  rating: yup.number().min(0).max(5).required(),
  category: yup.mixed().oneOf(PRODUCT_CATEGORIES).required(),
  color: yup.mixed().oneOf(PRODUCT_COLORS).required(),
});

export interface Product extends yup.InferType<typeof productSchema> {}

export const productsQuerySchema = yup.object({
  filters: yup
    .object({
      categories: yup.array().of(yup.mixed().oneOf(PRODUCT_CATEGORIES)),
      colors: yup.array().of(yup.mixed().oneOf(PRODUCT_COLORS)),
    })
    .nullable(),
  price: yup.array().of(yup.number()).nullable(),
  sort: yup
    .mixed()
    .oneOf(AVAILABLE_SORT.map((sort) => sort.key))
    .nullable(),
});
