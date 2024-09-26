import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.user, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome").notNullable().checkLength(">=", 3);
      table.string("senha").notNullable().checkLength(">=", 6);
      table.string("email").index().unique().notNullable().checkLength(">=", 6);

      table.comment("Table to store users in the schema");
    })
    .then(() => console.log(`# Created table ${ETableNames.user}`));
}

export async function down(knex: Knex) {
  return knex.schema
    .dropTable(ETableNames.user)
    .then(() => console.log(`# Dropped table ${ETableNames.user}`));
}
