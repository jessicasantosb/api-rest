import { compare, genSalt, hash } from "bcryptjs";

const hashPassword = async (password: string) => {
  const saltGenerated = await genSalt(8);

  return await hash(password, saltGenerated);
};

const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};

export const PasswordCrypto = { hashPassword, verifyPassword };
