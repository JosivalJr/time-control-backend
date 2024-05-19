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

export const deleteByIdValidation = ValidatorMiddleware((getSchema) => ({
  params: getSchema<ParamsPropsProtocol>(ParamsValidation),
}));

export async function deleteById(req: Request<{ id: string }>, res: Response) {
  const { params } = req;
  console.log({ params });
  return res.status(StatusCodes.NO_CONTENT).send();
}
