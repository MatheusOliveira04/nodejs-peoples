import type { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

export interface IFilter {
  filter: string;
}

const queryValidation: yup.ObjectSchema<IFilter> = yup.object().shape({
  filter: yup.string().required()
});

export const createQueryValidation: RequestHandler = async (req, res, next) => {
    try {
    await bodyValidation.validate(req.query, { abortEarly: false });
    return next(); 
  } catch(err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach(err => {
      if (!err.path) return;
      errors[err.path] = err.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json(errors);
  }
}

export interface ICidade {
  nome: string;
}

const bodyValidation: yup.ObjectSchema<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
  cidade: yup.string().required()
}); 

export const createBodyValidation: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, { abortEarly: false });
    return next();
  } catch(err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach(err => {
      if (!err.path) return;
      errors[err.path] = err.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json(errors);
  }
};

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  console.log(req.body);
  return res.send('Created');
};


