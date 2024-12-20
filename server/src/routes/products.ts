import express from 'express';
import { validateQuery } from '../middlewares/validateQuery';
import { ProductController } from '../controllers/products';

const ProductsRouter = express.Router();

ProductsRouter.get('/', validateQuery, ProductController.getProducts);

export default ProductsRouter;
