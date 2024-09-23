import { ICity } from "../../models";

declare module 'knex/types/tables' {
  interface Tables {
    cidade: ICity
    //pessoa: IPessoa
    //usuario: IUsuario
  }
}