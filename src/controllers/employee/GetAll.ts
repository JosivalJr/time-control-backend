import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatorMiddleware } from '../../middleware';
import * as yup from 'yup';
import { EmployeeProvider } from '../../database/providers/employee';

interface IQueryProps {
  page?: number;
  limit?: number;
}

const QueryValidation: yup.ObjectSchema<Partial<IQueryProps>> = yup
  .object()
  .shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
  });

export const getAllValidation = ValidatorMiddleware((getSchema) => ({
  query: getSchema<Partial<IQueryProps>>(QueryValidation),
}));

export async function getAll(
  req: Request<{}, {}, {}, Partial<IQueryProps>>,
  res: Response,
) {
  const { page, limit } = req.query;
  const result = await EmployeeProvider.getAll(page, limit);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  const count = await EmployeeProvider.count();
  if (count instanceof Error) {
    res.setHeader('access-control-expose-headers', 'em-total-count');
    res.setHeader('em-total-count', 0);
  }
  res.setHeader('access-control-expose-headers', 'em-total-count');
  res.setHeader('em-total-count', Number(count));
  return res.status(StatusCodes.OK).json(result);
}
