import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";

export const getById = async (id: number): Promise<IPerson | Error> => {
  try {
    const result = await Knex(ETableNames.person)
      .select("*")
      .where("id", "=", id)
      .first();

    if (result) return result;
    return new Error("Pessoa não encontrada.");
  } catch (error) {
    console.log("provider error: ", error);
    return new Error("Erro ao consultar a pessoa.");
  }
};
