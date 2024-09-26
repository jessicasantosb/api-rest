import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - GetById", () => {
  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resultCity = await testServer.post("/cities").send({ nome: "Serro" });
    cidadeId = resultCity.body;
  });

  it("Should create the person and then get by id", async () => {
    const resultCreated = await testServer
      .post("/people")
      .send({ nome: "Alice", email: "alice@email.com", cidadeId });

    expect(resultCreated.statusCode).toEqual(StatusCodes.CREATED);

    const resultGetted = await testServer
      .get(`/people/${resultCreated.body}`)
      .send();

    expect(resultGetted.statusCode).toEqual(StatusCodes.OK);
    expect(resultGetted.body).toHaveProperty("nome");
    expect(resultGetted.body).toHaveProperty("email");
    expect(resultGetted.body).toHaveProperty("cidadeId");
  });

  it("Should try to get a person that don't exist", async () => {
    const result = await testServer.get("/people/99999").send();

    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toHaveProperty("errors.default");
  });
});
