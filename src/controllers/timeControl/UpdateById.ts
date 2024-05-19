import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatorMiddleware } from '../../middleware';
import * as yup from 'yup';

type timeControlType = 'in' | 'out';

interface TimeControlProtocol {
  control_type?: timeControlType;
  control_time?: Date;
  updated_at?: Date;
}
interface ParamsPropsProtocol {
  id: string;
}

const BodyValidation: yup.ObjectSchema<TimeControlProtocol> = yup
  .object()
  .shape({
    control_type: yup.string().oneOf(['in', 'out']).optional(),
    control_time: yup.date().optional(),
    updated_at: yup.date().optional(),
  });

const ParamsValidation: yup.ObjectSchema<ParamsPropsProtocol> = yup
  .object()
  .shape({
    id: yup.string().required(),
  });

export const updateByIdValidation = ValidatorMiddleware((getSchema) => ({
  body: getSchema<TimeControlProtocol>(BodyValidation),
  params: getSchema<ParamsPropsProtocol>(ParamsValidation),
}));

export async function updateById(
  req: Request<{ id: string }, {}, TimeControlProtocol>,
  res: Response,
) {
  const { body, params } = req;
  const { id } = params;

  if (Object.keys(body).length <= 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'Error reading values in body content.',
        body,
      },
    });
  }

  if (Number(id) === 9999)
    return res.status(StatusCodes.NOT_FOUND).json({
      errors: {
        default: `Invalid identifier, could not find a time control with the id '${id}'.`,
      },
    });
  return res.status(StatusCodes.ACCEPTED).json(body);
}
