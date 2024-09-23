import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middleware";

interface ICity {
  nome: string;
}

export const createBodyValidation = validation((getSchema) => ({
  body: getSchema<ICity>(
    yup.object().shape({
      nome: yup.string().required().min(3),
    })
  ),
}));

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  console.log(req.body);

  return res.status(StatusCodes.CREATED).json(1);
};
