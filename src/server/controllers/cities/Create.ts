import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { ICity } from "../../database/models";
import { CitiesProvider } from "../../database/providers/cities";
import { validation } from "../../shared/middleware";

interface IBodyProps extends Omit<ICity, "id"> {}

export const createBodyValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3).max(150),
    })
  ),
}));

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  const result = await CitiesProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
