import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatorMiddleware } from '../../middleware';
import * as yup from 'yup';
import { uuidRegExp } from '../../utils';
import { ITimeControl } from '../../database/models';
import { TimeControlProvider } from '../../database/providers/timecontrol';
import { UUID } from 'crypto';

interface IParamProps {
  id: string;
}

interface IBodyProps
  extends Omit<
    ITimeControl,
    'id' | 'employee_id' | 'created_at' | 'updated_at' | 'control_type'
  > {
  control_type: string;
}

const ParamsValidation: yup.ObjectSchema<IParamProps> = yup.object().shape({
  id: yup.string().required().matches(uuidRegExp),
});

const BodyValidation: yup.ObjectSchema<Partial<IBodyProps>> = yup
  .object()
  .shape({
    control_type: yup.string().optional().oneOf(['in', 'out']),
    control_time: yup.date().optional(),
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
        default: `Error to update time control '${id}'. No data was sent in the request body.`,
        body,
      },
    });
  }

  const result = await TimeControlProvider.updateById(
    id as UUID,
    body as ITimeControl,
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
