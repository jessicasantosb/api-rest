import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - GetAll", () => {
  it("Should create the cities and then get all", async () => {
    const result = await testServer.post("/cities").send({ nome: "Serro" });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resultGetted = await testServer.get("/cities").send();

    expect(resultGetted.statusCode).toEqual(StatusCodes.OK);
    expect(Number(resultGetted.header["x-total-count"])).toBeGreaterThan(0);
    expect(resultGetted.body.length).toBeGreaterThan(0);
  });
});
