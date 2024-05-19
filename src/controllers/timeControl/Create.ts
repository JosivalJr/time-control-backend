import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatorMiddleware } from '../../middleware';
import * as yup from 'yup';

type timeControlType = 'in' | 'out';
interface TimeControlProtocol {
  id: string;
  control_type: timeControlType;
  control_time: Date;
  created_at: Date;
  updated_at: Date;
}

const BodyValidation: yup.ObjectSchema<TimeControlProtocol> = yup
  .object()
  .shape({
    id: yup.string().required().min(3),
    control_type: yup.mixed<timeControlType>().required(),
    control_time: yup.date().required(),
    created_at: yup.date().required(),
    updated_at: yup.date().required(),
  });

export const createValidation = ValidatorMiddleware((getSchema) => ({
  body: getSchema<TimeControlProtocol>(BodyValidation),
}));

export async function create(
  req: Request<{}, {}, TimeControlProtocol>,
  res: Response,
) {
  const { body } = req;
  console.log({ body });
  return res.status(StatusCodes.CREATED).json(body);
}
