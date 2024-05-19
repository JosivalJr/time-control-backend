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
  const { body, params } = req;
  const { id } = params;

  if (Object.keys(body).length <= 0)
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'Error reading values in body content.',
        body,
      },
    });

  if (Number(id) === 9999)
    return res.status(StatusCodes.NOT_FOUND).json({
      errors: {
        default: `Invalid identifier, could not find a employee with the id '${id}'.`,
      },
    });
  return res.status(StatusCodes.ACCEPTED).json(body);
}
