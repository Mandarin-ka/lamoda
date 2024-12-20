import { NextFunction, Request, Response } from 'express';
import { productsQuerySchema } from '../validations/productsValidator';
import qs from 'qs';

export const validateQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.query) {
      next();
      return;
    }

    const { price } = qs.parse(req.query as unknown as string);

    if (
      !productsQuerySchema.isValidSync(qs.parse(req.query as unknown as string))
    ) {
      res.status(400).json({ message: 'Invalid query params' });
      return;
    }
    if (price) {
      if (!Array.isArray(price)) {
        res.status(400).json({ message: 'Invalid query params' });
        return;
      }
      const from = +price[0];
      const to = +price[1];
      if (from > to || isNaN(from) || isNaN(to) || from < 0 || to < 0) {
        res.status(400).json({ message: 'Invalid query params' });
        return;
      }
    }
    next();
  } catch (e) {
    res.status(500).json(e);
    return;
  }
};
