import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { IUser } from "../../database/models";
import { UsersProvider } from "../../database/providers/users";
import { validation } from "../../shared/middleware";
import { JWTService, PasswordCrypto } from "../../shared/services";

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

  const user = await UsersProvider.getByEmail(email);

  if (user instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: user.message,
      },
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(senha, user.senha);

  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha inválidos.",
      },
    });
  } else {
    const accessToken = JWTService.sign({ uid: user.id });
    if (accessToken === "JWT_SECRET_NOT_FOUND") {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: "Erro ao gerar o token de acesso.",
        },
      });
    }
    return res.status(StatusCodes.OK).json({ accessToken });
  }
};
