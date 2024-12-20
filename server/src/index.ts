import bodyParser from 'body-parser';
import express, {
  Application,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import ProductsRouter from './routes/products';
import { instance as databaseInstance } from './database';
import {
  AVAILABLE_SORT,
  PRODUCT_CATEGORIES,
  PRODUCT_COLORS,
} from './constants';

const app: Application = express();
const router: Router = Router();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req: Request, res: Response, next: NextFunction): void => {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

router.use('/products', ProductsRouter);
router.get('/', (req: Request, res: Response): void => {
  // send all the available settings
  res.status(200).json({
    filters: [
      {
        name: 'Категории',
        key: 'categories',
        data: PRODUCT_CATEGORIES,
      },
      {
        name: 'Цвета',
        key: 'colors',
        data: PRODUCT_COLORS,
      },
    ],
    sortings: AVAILABLE_SORT,
  });
});

app.use(router);
// ideally use external db
//
// mongoose.connect(
//   process.env.MONGO_URL,
// ).then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err))

databaseInstance.connect().then(() => {
  console.log('Connected to db');
  databaseInstance.createMockProducts();
});

app.listen(PORT, (): void =>
  console.log(`\nServer listening at http://localhost:${PORT}`)
);
