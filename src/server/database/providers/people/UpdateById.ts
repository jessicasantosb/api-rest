import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";

export const updateById = async (
  id: number,
  person: Omit<IPerson, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.person)
      .update(person)
      .where("id", "=", id);
    if (result > 0) return;

    return new Error("Erro ao atualizar a pessoa.");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar a pessoa.");
  }
};
