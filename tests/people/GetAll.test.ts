import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - GetAll", () => {
  let cidadeId: number | undefined = undefined;
  let accessToken = "";

  beforeAll(async () => {
    const email = "get_all_people@email.com";
    await testServer
      .post("/registrar")
      .send({ nome: "teste", email, senha: "123456" });
    const resultSignIn = await testServer
      .post("/entrar")
      .send({ email, senha: "123456" });

    accessToken = resultSignIn.body.accessToken;
  });

  beforeAll(async () => {
    const resultCity = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Serro" });
    cidadeId = resultCity.body;
  });

  it("Should create the person and then get all without access token", async () => {
    const result = await testServer
      .post("/people")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: "Teste",
        email: "noaccestoken@email.com",
        cidadeId,
      });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resultGetted = await testServer.get("/people").send();

    expect(resultGetted.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resultGetted.body).toHaveProperty("errors.default");
  });

  it("Should create the person and then get all", async () => {
    const result = await testServer
      .post("/people")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: "Teste",
        email: "teste@email.com",
        cidadeId,
      });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resultGetted = await testServer
      .get("/people")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resultGetted.statusCode).toEqual(StatusCodes.OK);
    expect(Number(resultGetted.header["x-total-count"])).toBeGreaterThan(0);
    expect(resultGetted.body.length).toBeGreaterThan(0);
  });
});
