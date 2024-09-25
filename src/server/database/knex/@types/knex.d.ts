import { ICity, IPerson } from "../../models";

declare module 'knex/types/tables' {
  interface Tables {
    city: ICity
    person: IPerson
    //usuario: IUsuario
  }
}