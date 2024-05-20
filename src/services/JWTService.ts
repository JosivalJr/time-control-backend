import { UUID } from 'crypto';
import * as jwt from 'jsonwebtoken';

interface IJwtData {
  uid: UUID;
}
const jwtSecret = process.env.JWT_SECRET;

const sign = (data: IJwtData): string | 'JWT_SECRET_NOT_FOUND' => {
  if (!jwtSecret) return 'JWT_SECRET_NOT_FOUND';

  return jwt.sign(data, jwtSecret, {
    expiresIn: '12h',
  });
};

const verify = (
  token: string,
): IJwtData | 'JWT_SECRET_NOT_FOUND' | 'INVALID_TOKEN' => {
  if (!jwtSecret) return 'JWT_SECRET_NOT_FOUND';

  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (typeof decoded === 'string') {
      return 'INVALID_TOKEN';
    }

    return decoded as IJwtData;
  } catch (error) {
    console.error(error);
    return 'INVALID_TOKEN';
  }
};

export const JWTService = {
  sign,
  verify,
};
