import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatorMiddleware } from '../../middleware';
import crypto from 'crypto';
import * as yup from 'yup';
import { IEmployee } from '../../database/models';
import { EmployeeProvider } from '../../database/providers/employee';

interface IBodyProps
  extends Omit<IEmployee, 'id' | 'created_at' | 'updated_at'> {}

const BodyValidation: yup.ObjectSchema<IBodyProps> = yup.object().shape({
  first_name: yup.string().required().min(3).max(30),
  last_name: yup.string().required().min(3).max(30),
  email: yup.string().required().email().min(5).max(30),
  password: yup.string().required().min(6).max(255),
});

export const createValidation = ValidatorMiddleware((getSchema) => ({
  body: getSchema<IBodyProps>(BodyValidation),
}));

export async function create(req: Request<{}, {}, IBodyProps>, res: Response) {
  const { body } = req;
  const id = crypto.randomUUID();
  const createBody = { ...body, id };

  const result = await EmployeeProvider.create(createBody);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
}
