import { ICity, IPerson, IUser } from "../../models";

declare module "knex/types/tables" {
  interface Tables {
    city: ICity;
    person: IPerson;
    user: IUser;
  }
}
