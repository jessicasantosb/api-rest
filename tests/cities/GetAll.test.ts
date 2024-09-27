import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - GetAll", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "get_all_cities@email.com";
    await testServer
      .post("/registrar")
      .send({ nome: "teste", email, senha: "123456" });
    const resultSignIn = await testServer
      .post("/entrar")
      .send({ email, senha: "123456" });

    accessToken = resultSignIn.body.accessToken;
  });

  it("Should try to get all cities without access token", async () => {
    const result = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Serro" });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resultGetted = await testServer.get("/cities").send();

    expect(resultGetted.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resultGetted.body).toHaveProperty("errors.default");
  });

  it("Should create the cities and then get all", async () => {
    const result = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Serro" });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resultGetted = await testServer
      .get("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resultGetted.statusCode).toEqual(StatusCodes.OK);
    expect(Number(resultGetted.header["x-total-count"])).toBeGreaterThan(0);
    expect(resultGetted.body.length).toBeGreaterThan(0);
  });
});
