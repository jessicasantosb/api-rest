import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";

export const create = async (
  person: Omit<IPerson, "id">
): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.city)
      .where("id", "=", person.cidadeId)
      .count<[{ count: number }]>("* as count");

    if (count === 0) return new Error("A cidade não foi encontrada.");

    const [result] = await Knex(ETableNames.person)
      .insert(person)
      .returning("id");

    if (typeof result === "object") return result.id;
    if (typeof result === "number") return result;

    return new Error("Erro ao criar a pessoa.");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao criar a pessoa.");
  }
};
