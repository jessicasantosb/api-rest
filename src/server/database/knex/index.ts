import "dotenv/config";
import { knex } from "knex";
import pg from "pg";

import { development, production, test } from "./Environments";

if (process.env.NODE_ENV === "production") {
  pg.types.setTypeParser(20, "text", parseInt);
}

const getEnvironments = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return production;
    case "test":
      return test;
    default:
      return development;
  }
};

export const Knex = knex(getEnvironments());
