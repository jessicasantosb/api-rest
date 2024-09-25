import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { IPerson } from "../../database/models";
import { PeopleProvider } from "../../database/providers/people";
import { validation } from "../../shared/middleware";

interface IBodyProps extends Omit<IPerson, "id"> {}

export const createBodyValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
      email: yup.string().email().required(),
      cidadeId: yup.number().integer().required().min(1),
    })
  ),
}));

export const create = async (req: Request<{}, {}, IPerson>, res: Response) => {
  const result = await PeopleProvider.create(req.body);  

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
