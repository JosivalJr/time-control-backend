import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatorMiddleware } from '../../middleware';
import * as yup from 'yup';

type timeControlType = 'in' | 'out';

interface TimeControlProtocol {
  id: string;
  control_type?: timeControlType;
  control_time?: Date;
  updated_at: Date;
}
interface ParamsPropsProtocol {
  id: string;
}

const BodyValidation: yup.ObjectSchema<TimeControlProtocol> = yup
  .object()
  .shape({
    id: yup.string().required().min(3),
    control_type: yup.mixed<timeControlType>().required(),
    control_time: yup.date().required(),
    updated_at: yup.date().required(),
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
  const { body, query } = req;
  console.log({ query, body });
  return res.status(StatusCodes.ACCEPTED).json({ body, query });
}
