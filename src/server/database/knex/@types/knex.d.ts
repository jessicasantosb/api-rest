import { ICity } from "../../models";

declare module 'knex/types/tables' {
  interface Tables {
    city: ICity
    //pessoa: IPessoa
    //usuario: IUsuario
  }
}