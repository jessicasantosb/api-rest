import { Router } from 'express';
import { CitiesControllers } from '../controllers';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Hello world');
});

router.post('/cities',CitiesControllers.createBodyValidator, CitiesControllers.create);

export { router };
