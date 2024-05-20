import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatorMiddleware } from '../../middleware';
import * as yup from 'yup';
import { IEmployee } from '../../database/models';
import { EmployeeProvider } from '../../database/providers/employee';
import { uuidRegExp } from '../../utils';
import { UUID } from 'crypto';
import { access } from 'fs';
import { JWTService, PasswordCrypto } from '../../services';

interface IBodyProps
  extends Omit<
    IEmployee,
    'id' | 'first_name' | 'last_name' | 'email' | 'created_at' | 'updated_at'
  > {
  id: string;
}

const BodyValidation: yup.ObjectSchema<IBodyProps> = yup.object().shape({
  id: yup.string().required().matches(uuidRegExp),
  password: yup.string().required().min(6).max(24),
});

export const signInValidation = ValidatorMiddleware((getSchema) => ({
  body: getSchema<IBodyProps>(BodyValidation),
}));

export async function signIn(req: Request<{}, {}, IBodyProps>, res: Response) {
  const { id, password } = req.body;

  const employee = await EmployeeProvider.getById(id as UUID);

  if (employee instanceof Error || employee.length === 0) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: `The employee with identifier '${id}' does not have permission to access this resource.`,
      },
    });
  }

  const employeeInfos = employee[0];
  const passwordMatch = await PasswordCrypto.verifyPassword(
    password,
    employeeInfos.password,
  );

  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: `Invalid password.`,
      },
    });
  }

  const accessToken = JWTService.sign({ uid: employeeInfos.id });
  if (accessToken === 'JWT_SECRET_NOT_FOUND') {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: `Error generating a new access token.`,
      },
    });
  }
  return res.status(StatusCodes.OK).json({ accessToken });
}
