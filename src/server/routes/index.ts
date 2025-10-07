import { Router } from 'express';

import { CidadeController } from '../controllers/';

const router = Router();

router.get('/', (_, res) => {
    res.send('Hello world!');
});

router.post('/cidades', CidadeController.createBodyValidation, CidadeController.create);

export { router };
