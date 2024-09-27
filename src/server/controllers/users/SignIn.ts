import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { IUser } from "../../database/models";
import { UsersProvider } from "../../database/providers/users";
import { validation } from "../../shared/middleware";

interface IBodyProps extends Omit<IUser, "id" | "nome"> {}

export const signInBodyValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().email().required().min(6),
      senha: yup.string().required().min(6),
    })
  ),
}));

export const signIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const { email, senha } = req.body;

  const result = await UsersProvider.getByEmail(email);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: result.message,
      },
    });
  }

  if (senha !== result.senha) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha inválidos.",
      },
    });
  } else {
    return res
      .status(StatusCodes.OK)
      .json({ accessToken: "teste.teste.teste" });
  }
};
