import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatorMiddleware } from '../../middleware';
import * as yup from 'yup';

interface EmployeeProtocol {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

interface ParamsPropsProtocol {
  id: string;
}

const BodyValidation: yup.ObjectSchema<EmployeeProtocol> = yup.object().shape({
  first_name: yup.string().optional().min(3),
  last_name: yup.string().optional().min(3),
  email: yup.string().optional().email(),
  password: yup.string().optional().min(3),
});

const ParamsValidation: yup.ObjectSchema<ParamsPropsProtocol> = yup
  .object()
  .shape({
    id: yup.string().required(),
  });

export const updateByIdValidation = ValidatorMiddleware((getSchema) => ({
  body: getSchema<EmployeeProtocol>(BodyValidation),
  params: getSchema<ParamsPropsProtocol>(ParamsValidation),
}));

export async function updateById(
  req: Request<{ id: string }, {}, EmployeeProtocol>,
  res: Response,
) {
  const { body, query } = req;
  console.log({ query, body });
  return res.status(StatusCodes.ACCEPTED).json({ body, query });
}
