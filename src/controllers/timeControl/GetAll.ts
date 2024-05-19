import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatorMiddleware } from '../../middleware';
import * as yup from 'yup';

interface QueryPropsProtocol {
  page?: number;
  limit?: number;
  filter?: string;
}

const QueryValidation: yup.ObjectSchema<QueryPropsProtocol> = yup
  .object()
  .shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
  });

export const getAllValidation = ValidatorMiddleware((getSchema) => ({
  query: getSchema<QueryPropsProtocol>(QueryValidation),
}));

export async function getAll(
  req: Request<{}, {}, {}, QueryPropsProtocol>,
  res: Response,
) {
  const { query } = req;
  console.log({ query });
  res.setHeader('access-control-expose-headers', 'tc-total-count');
  res.setHeader('tc-total-count', 2);
  return res.status(StatusCodes.OK).json([{}, {}]);
}
