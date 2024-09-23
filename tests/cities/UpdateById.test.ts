import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - UpdateById", () => {
  it("Should create the city and then update", async () => {
    const result = await testServer.post("/cities").send({ nome: "Serro" });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resultUpdated = await testServer
      .put(`/cities/${result.body}`)
      .send({ nome: "Diamantina" });

    expect(resultUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Should try to update a city that don't exist", async () => {
    const result = await testServer
      .put("/cities/99999")
      .send({ nome: "Diamantina" });

    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toHaveProperty("errors.default");
  });
});
