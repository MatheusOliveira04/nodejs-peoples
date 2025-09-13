import type { Request, Response } from 'express';

export interface ICidade {
  nome: string;
}

export const create = (req: Request<{}, {}, ICidade>, res: Response) => {
  return res.send('Creating cidade: ' + req.body.nome);
};


