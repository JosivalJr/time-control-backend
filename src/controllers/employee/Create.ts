import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatorMiddleware } from '../../middleware';
import * as yup from 'yup';

interface EmployeeProtocol {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
  password: string;
}

const BodyValidation: yup.ObjectSchema<EmployeeProtocol> = yup.object().shape({
  first_name: yup.string().required().min(3),
  last_name: yup.string().required().min(3),
  email: yup.string().required().email(),
  id: yup.string().required().min(3),
  password: yup.string().required().min(3),
});

export const createValidation = ValidatorMiddleware((getSchema) => ({
  body: getSchema<EmployeeProtocol>(BodyValidation),
}));

export async function create(
  req: Request<{}, {}, EmployeeProtocol>,
  res: Response,
) {
  const { body } = req;
  console.log({ body });
  return res.status(StatusCodes.CREATED).json(body);
}
