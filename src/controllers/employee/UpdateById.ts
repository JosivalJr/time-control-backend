import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatorMiddleware } from '../../middleware';
import { IEmployee } from '../../database/models';
import * as yup from 'yup';
import { uuidRegExp } from '../../utils';
import { EmployeeProvider } from '../../database/providers/employee';
import { UUID } from 'crypto';

interface IParamProps {
  id: string;
}

interface IBodyProps
  extends Omit<IEmployee, 'id' | 'created_at' | 'updated_at'> {}

const BodyValidation: yup.ObjectSchema<Partial<IBodyProps>> = yup
  .object()
  .shape({
    first_name: yup.string().optional().min(3).max(30),
    last_name: yup.string().optional().min(3).max(30),
    email: yup.string().optional().email().min(5).max(30),
    password: yup.string().optional().min(6).max(255),
  });

const ParamsValidation: yup.ObjectSchema<IParamProps> = yup.object().shape({
  id: yup.string().required().matches(uuidRegExp),
});

export const updateByIdValidation = ValidatorMiddleware((getSchema) => ({
  body: getSchema<Partial<IBodyProps>>(BodyValidation),
  params: getSchema<IParamProps>(ParamsValidation),
}));

export async function updateById(
  req: Request<{ id: string }, {}, IBodyProps>,
  res: Response,
) {
  const { body } = req;
  const { id } = req.params;

  if (Object.keys(body).length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: `Error to update employee '${id}'. No data was sent in the request body.`,
        body,
      },
    });
  }
  const result = await EmployeeProvider.updateById(
    id as UUID,
    body as IEmployee,
  );

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.ACCEPTED).send(result);
}
