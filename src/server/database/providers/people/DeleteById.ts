import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.person).where("id", "=", id).del();
    if (result > 0) return;

    return new Error("Erro ao deletar a pessoa.");
  } catch (error) {
    console.log("provider error: ", error);
    return new Error("Erro ao deletar a pessoa.");
  }
};
