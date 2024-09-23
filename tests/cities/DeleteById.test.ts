import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities = DeleteById", () => {
  it("Should create the city and then delete", async () => {
    const result = await testServer.post("/cities").send({ nome: "Serro" });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resultDeleted = await testServer
      .delete(`/cities/${result.body}`)
      .send();

    expect(resultDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Should try to delete a city that don't exist", async () => {
    const resultDeleted = await testServer.delete("/cities/99999").send();

    expect(resultDeleted.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resultDeleted.body).toHaveProperty("errors.default");
  });
});
