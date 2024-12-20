import { Request, Response } from 'express';
import { instance } from '../database';
import { Product } from '../validations/productsValidator';
import { SortType } from '../constants';
import qs from 'qs';

export class ProductController {
  public static getProducts = async (req: Request, res: Response) => {
    try {
      const productsData = await instance.db.getData('/products');
      let products = productsData?.length ? productsData : [];
      const { q, filters, price, sort } = qs.parse(
        req.query as unknown as any
      ) as unknown as {
        q: string;
        filters: any;
        price: [number, number];
        sort: SortType;
      };
      products = products
        .filter((product: any) => {
          const categoryFilter =
            !filters?.categories?.length ||
            (filters.categories as string[]).includes(product.category);

          const colorFilter =
            !filters?.colors?.length ||
            (filters.colors as string[]).includes(product.color);

          const searchFilter =
            !q ||
            [product.name, product.description].some((value) =>
              value.toLowerCase().includes((q as string).toLowerCase())
            );

          const priceFilter =
            !price ||
            (product.price >= +price[0] && product.price <= +price[1]);

          return categoryFilter && colorFilter && searchFilter && priceFilter;
        })
        .sort((a: Product, b: Product) => {
          switch (sort) {
            case SortType.priceAsc:
              return a.price - b.price;
            case SortType.priceDesc:
              return b.price - a.price;
            case SortType.ratingDesc:
              return b.rating - a.rating;
            default:
              return a.price - b.price;
          }
        });

      res.status(200).json(products);
    } catch (e) {
      res.status(500).json(e);
    }
  };
}
