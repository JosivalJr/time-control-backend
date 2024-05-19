import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatorMiddleware } from '../../middleware';
import * as yup from 'yup';
import { ITimeControl, timeControlType } from '../../database/models';
import { TimeControlProvider } from '../../database/providers/timecontrol';
import { uuidRegExp } from '../../utils';
import { UUID } from 'crypto';

interface IBodyProps
  extends Omit<
    ITimeControl,
    'id' | 'employee_id' | 'control_type' | 'created_at' | 'updated_at'
  > {
  employee_id: string;
  control_type: string;
}

const BodyValidation: yup.ObjectSchema<IBodyProps> = yup.object().shape({
  control_type: yup.string().oneOf(['in', 'out']).required(),
  control_time: yup.date().required(),
  employee_id: yup.string().required().matches(uuidRegExp),
});

export const createValidation = ValidatorMiddleware((getSchema) => ({
  body: getSchema<IBodyProps>(BodyValidation),
}));

export async function create(req: Request<{}, {}, IBodyProps>, res: Response) {
  const { body } = req;
  const { employee_id, control_type } = body;
  const dateNow = new Date();
  const id = crypto.randomUUID();
  const createBody = {
    ...body,
    created_at: dateNow,
    updated_at: dateNow,
    control_type: control_type as timeControlType,
    employee_id: employee_id as UUID,
    id: id as UUID,
  };

  const result = await TimeControlProvider.create(createBody);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.CREATED).json(result);
}
