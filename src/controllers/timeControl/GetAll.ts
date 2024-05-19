import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatorMiddleware } from '../../middleware';
import * as yup from 'yup';
import { TimeControlProvider } from '../../database/providers/timecontrol';
import { UUID } from 'crypto';
import { uuidRegExp } from '../../utils';

interface IQueryProps {
  page: number;
  limit: number;
  filter: string;
}

const QueryValidation: yup.ObjectSchema<Partial<IQueryProps>> = yup
  .object()
  .shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional().matches(uuidRegExp),
  });

export const getAllValidation = ValidatorMiddleware((getSchema) => ({
  query: getSchema<Partial<IQueryProps>>(QueryValidation),
}));

export async function getAll(
  req: Request<{}, {}, {}, Partial<IQueryProps>>,
  res: Response,
) {
  const { query } = req;

  const result = await TimeControlProvider.getAll(
    query.page || 1,
    query.limit || 10,
    (query.filter as UUID) || undefined,
  );
  const count = await TimeControlProvider.count();

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: count.message,
      },
    });
  }

  res.setHeader('access-control-expose-headers', 'em-total-count');
  res.setHeader('em-total-count', Number(count));
  return res.status(StatusCodes.OK).json(result);
}
