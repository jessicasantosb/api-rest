import { Knex } from "knex";
import { ETableNames } from "../ETableNames";
import { citiesToInsert } from "../citiesToInsert";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.city).count<[{ count: number }]>(
    "* as count"
  );
  if (!Number.isInteger(count) || Number(count) > 0) return;

  const cities = citiesToInsert.cidades.map((nomeDaCidade) => ({
    nome: nomeDaCidade,
  }));
  await knex(ETableNames.city).insert(cities);
};
