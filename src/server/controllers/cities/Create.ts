import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface ICity {
  nome: string;
  estado: string;
}

interface IFilter {
  filter?: string;
}

export const createBodyValidation = validation((getSchema) => ({
  body: getSchema<ICity>(
    yup.object().shape({
      nome: yup.string().required().min(3),
      estado: yup.string().required().min(3),
    })
  ),
  query: getSchema<IFilter>(
    yup.object().shape({
      filter: yup.string().optional().min(3),
    })
  ),
}));

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  console.log(req.body);

  return res.send("Criado com sucesso!");
};
