import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', (_, res) => {
    res.send('Hello world!');
});

router.post('/test', (req, res) => {
  res.status(StatusCodes.CREATED).json(req.body);
});

export { router };
