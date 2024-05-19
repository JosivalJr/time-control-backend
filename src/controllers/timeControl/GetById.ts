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
  const { id } = req.params;

  if (Number(id) === 9999)
    return res.status(StatusCodes.NOT_FOUND).json({
      errors: {
        default: `Invalid identifier, could not find a time control with the id '${id}'.`,
      },
    });

  return res.status(StatusCodes.OK).json({
    id: '123',
    control_type: 'in',
    control_time: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  });
}
