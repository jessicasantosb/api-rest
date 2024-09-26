import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";

export const getAll = async (
  page: number,
  limit: number,
  filter: string
): Promise<IPerson[] | Error> => {
  try {
    const result = await Knex(ETableNames.person)
      .select("*")
      .where("nome", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log("provider error: ", error);
    return new Error("Erro ao consultar as pessoas.");
  }
};
