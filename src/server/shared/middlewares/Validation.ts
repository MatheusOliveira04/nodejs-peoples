import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { AnyObject, Maybe, ObjectSchema, ValidationError } from "yup";

// const field: 'body' | 'header' | 'params' | 'query';

type TProperty = 'body' | 'header' | 'params' | 'query';

type TAllSchemas = Record<TProperty, ObjectSchema<any>>;

type TGetSchemas = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>;

type TGetAllSchemas = (getSchema: TGetSchemas) => Partial<TAllSchemas>;

type TValidation = (schemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (schemas) => async (req, res, next) => {
  const errorsResult: Record<string, Record<string, string>> = {};
  Object.entries(schemas).forEach(([field, schema]) => {
    try {
      schema.validateSync(req[field as TProperty], { abortEarly: false });
    } catch (err) {
      const validationError = err as ValidationError;
      const errors: Record<string, string> = {};
   
      validationError.inner.forEach(err => {
        if (err.path === undefined) return;
          errors[err.path] = err.message;
        }); 
        errorsResult[field] = errors;
    }
  
  });

  if (Object.entries(schemas).length === 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: errorsResult })
  }

};
