import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatorMiddleware } from '../../middleware';
import * as yup from 'yup';
import { uuidRegExp } from '../../utils';
import { UUID } from 'crypto';
import { TimeControlProvider } from '../../database/providers/timecontrol';

interface IParamProps {
  id: string;
}

const ParamsValidation: yup.ObjectSchema<IParamProps> = yup.object().shape({
  id: yup.string().required().matches(uuidRegExp),
});

export const getByIdValidation = ValidatorMiddleware((getSchema) => ({
  params: getSchema<IParamProps>(ParamsValidation),
}));

export async function getById(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;

  const result = await TimeControlProvider.getById(id as UUID);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  if (result.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({
      errors: {
        default: `It was not possible to find a time control with id: '${id}' in the database.`,
      },
    });
  }

  return res.status(StatusCodes.OK).send(result[0]);
}
