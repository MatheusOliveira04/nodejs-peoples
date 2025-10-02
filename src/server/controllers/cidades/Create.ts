import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

export interface ICidade {
  nome: string;
}

const bodyValidation: yup.ObjectSchema<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
  cidade: yup.string().required()
}); 

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  let validatedData: ICidade | undefined = undefined;
  try {
    validatedData = await bodyValidation.validate(req.body, { abortEarly: false }) as ICidade;
  } catch(error) {
    const yupError = error as yup.ValidationError;
    const err: Record<string, string> = {};

    yupError.inner.forEach(error => {
      if (!error.path) return;
       err[error.path] = error.message;
    }); 

    return res.status(StatusCodes.BAD_REQUEST).json({
      err
    });
  }
  console.log(validatedData);
  return res.send('Created');
};


