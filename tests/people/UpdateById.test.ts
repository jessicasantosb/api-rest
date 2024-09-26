import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - UpdateById", () => {
  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resultCity = await testServer.post("/cities").send({ nome: "Serro" });
    cidadeId = resultCity.body;
  });

  it("Should create the person and then update the email", async () => {
    const resultCreated = await testServer
      .post("/people")
      .send({ nome: "João", email: "joao@email.com", cidadeId });

    expect(resultCreated.statusCode).toEqual(StatusCodes.CREATED);

    const resultUpdated = await testServer
      .put(`/people/${resultCreated.body}`)
      .send({ nome: "João", email: "joaovitor@email.com", cidadeId });

    expect(resultUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Should create the person and then update the name", async () => {
    const resultCreated = await testServer
      .post("/people")
      .send({ nome: "João", email: "joao@email.com", cidadeId });

    expect(resultCreated.statusCode).toEqual(StatusCodes.CREATED);

    const resultUpdated = await testServer
      .put(`/people/${resultCreated.body}`)
      .send({ nome: "João Vitor", email: "joao@email.com", cidadeId });

    expect(resultUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Should try to update a person with invalid cidadeId", async () => {
    const resultCreated = await testServer
      .post("/people")
      .send({ nome: "Pedro", email: "pedro@email.com", cidadeId });

    expect(resultCreated.statusCode).toEqual(StatusCodes.CREATED);

    const result = await testServer.put(`/people/${resultCreated.body}`).send({
      nome: "Pedro Lucas",
      email: "pedro@email.com",
      cidadeId: 999999,
    });

    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toHaveProperty("errors.default");
  });

  it("Should try to update a person that don't exist", async () => {
    const result = await testServer
      .put("/people/99999")
      .send({ nome: "Pedro", email: "pedro@email.com", cidadeId });

    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toHaveProperty("errors.default");
  });
});
