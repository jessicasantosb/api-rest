import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICity } from "../../models";

export const create = async (
  city: Omit<ICity, "id">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.city).insert(city).returning("id");

    if (typeof result === "object") return result.id;
    if (typeof result === "number") return result;

    return new Error("Erro ao criar a cidade.");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao criar a cidade.");
  }
};
