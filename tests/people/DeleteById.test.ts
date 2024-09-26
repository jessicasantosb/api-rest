import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - DeleteById", () => {
  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resultCity = await testServer.post("/cities").send({ nome: "Serro" });
    cidadeId = resultCity.body;
  });

  it("Should create the person and then delete", async () => {
    const result = await testServer
      .post("/people")
      .send({ nome: "João", email: "teste@email.com", cidadeId });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resultDeleted = await testServer
      .delete(`/people/${result.body}`)
      .send();

    expect(resultDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Should try to delete a person that don't exist", async () => {
    const result = await testServer.delete("/people/99999").send();

    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toHaveProperty("errors.default");
  });
});
