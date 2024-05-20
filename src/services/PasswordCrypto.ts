import { compare, genSalt, hash } from 'bcryptjs';

const saltRandoms = process.env.SALT_RANDOMS || 8;

const hashPassword = async (password: string) => {
  const saltGenerated = await genSalt(Number(saltRandoms));

  return await hash(password, saltGenerated);
};

const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};

export const PasswordCrypto = {
  hashPassword,
  verifyPassword,
};
