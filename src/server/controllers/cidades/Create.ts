import type { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import  { validation } from '../../shared/middlewares'
import * as yup from 'yup';

export interface IFilter {
  filter: string;
}

const queryValidation: yup.ObjectSchema<IFilter> = yup.object().shape({
  filter: yup.string().required()
});

export interface ICidade {
  nome: string;
}

const bodyValidation: yup.ObjectSchema<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
  cidade: yup.string().required()
}); 

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  console.log(req.body);
  return res.send('Created');
};


export const createValidation = validation((getSchema) => ({
  body: getSchema<ICidade>(yup.object().shape({
    nome: yup.string().required()
  })),
  query: yup.object().shape({
    filter: yup.string().required()
  })
}));


