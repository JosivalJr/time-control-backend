import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatorMiddleware } from '../../middleware';
import * as yup from 'yup';
import { uuidRegExp } from '../../utils';
import { EmployeeProvider } from '../../database/providers/employee';
import { UUID } from 'crypto';

interface IParamProps {
  id: string;
}

const ParamsValidation: yup.ObjectSchema<IParamProps> = yup.object().shape({
  id: yup.string().required().matches(uuidRegExp),
});

export const deleteByIdValidation = ValidatorMiddleware((getSchema) => ({
  params: getSchema<IParamProps>(ParamsValidation),
}));

export async function deleteById(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const result = await EmployeeProvider.deleteById(id as UUID);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.NO_CONTENT).send();
}
