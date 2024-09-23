import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { ICity } from "../../database/models";
import { validation } from "../../shared/middleware";

interface IBodyProps extends Omit<ICity, "id"> {}

export const createBodyValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
    })
  ),
}));

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  console.log(req.body);

  return res.status(StatusCodes.CREATED).json(1);
};
