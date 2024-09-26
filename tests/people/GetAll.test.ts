import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - GetAll", () => {
  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resultCity = await testServer.post("/cities").send({ nome: "Serro" });
    cidadeId = resultCity.body;
  });

  it("Should create the person and then get all", async () => {
    const result = await testServer.post("/people").send({
      nome: "Teste",
      email: "teste@email.com",
      cidadeId,
    });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resultGetted = await testServer.get("/people").send();

    expect(resultGetted.statusCode).toEqual(StatusCodes.OK);
    expect(Number(resultGetted.header["x-total-count"])).toBeGreaterThan(0);
    expect(resultGetted.body.length).toBeGreaterThan(0);
  });
});
