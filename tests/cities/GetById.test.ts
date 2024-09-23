import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - GetById", () => {
  it("Should create the city and then get by id", async () => {
    const result = await testServer.post("/cities").send({ nome: "Serro" });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resultGetted = await testServer.get(`/cities/${result.body}`).send();

    expect(resultGetted.statusCode).toEqual(StatusCodes.OK);
    expect(resultGetted.body).toHaveProperty("nome");
  });

  it("Should try to get a city that don't exist", async () => {
    const result = await testServer.get("/cities/99999").send();

    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toHaveProperty("errors.default");
  });
});
