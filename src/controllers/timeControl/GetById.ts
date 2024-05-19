import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatorMiddleware } from '../../middleware';
import * as yup from 'yup';

interface ParamsPropsProtocol {
  id: string;
}

const ParamsValidation: yup.ObjectSchema<ParamsPropsProtocol> = yup
  .object()
  .shape({
    id: yup.string().required(),
  });

export const getByIdValidation = ValidatorMiddleware((getSchema) => ({
  params: getSchema<ParamsPropsProtocol>(ParamsValidation),
}));

export async function getById(req: Request<{ id: string }>, res: Response) {
  const { params } = req;
  console.log({ params });
  return res.status(StatusCodes.NO_CONTENT);
}
