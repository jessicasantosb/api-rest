import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - Create", () => {
  it("Should create a new city", async () => {
    const res1 = await testServer.post("/cities").send({ nome: "Serro" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("Can't create a new city with short name", async () => {
    const res1 = await testServer.post("/cities").send({ nome: "Se" });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nome");
  });
});
