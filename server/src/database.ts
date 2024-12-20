import { JsonDB, Config } from 'node-json-db'; // using temporary db
import {
  PRODUCT_CATEGORIES,
  PRODUCT_COLORS,
  PRODUCT_IMAGES,
} from './constants';
import { v4 as uuid } from 'uuid';
import { Product } from './validations/productsValidator';

const descriptions = [
  'This is a product with a long description',
  'This is a product with a short description',
  'This is a product with a very long description that will be truncated',
  'This is a product with a very short description',
  'This is a product with a description that will be displayed in full',
];

const getRandom = (item) => {
  return item[Math.floor(Math.random() * item.length)];
};

export class db {
  db: JsonDB;
  config: Config;

  async connect(): Promise<void> {
    // some synthetic delay
    new Promise((resolve) => setTimeout(resolve, 200));
    console.log('connecting to db...');
    this.db = new JsonDB(new Config('db', true, false, '/'));
    return;
  }
  async createMockProducts(): Promise<void> {
    console.log('creating mock products...');
    const products = Array.from(
      { length: 10 },
      (_, i): Product => ({
        id: uuid(),
        name: `Product ${i + 1}`,
        description: getRandom(descriptions),
        category: getRandom(PRODUCT_CATEGORIES),
        color: getRandom(PRODUCT_COLORS),
        price: Math.floor(Math.random() * 1000),
        imageUrl: getRandom(PRODUCT_IMAGES),
        rating: +(Math.random() * 5).toFixed(1),
      })
    );

    await this.db.push('/products', products);
    console.log('mock products created');
  }
}

export const instance = new db();
