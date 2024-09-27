import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - GetById", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "get_city_by_id@email.com";
    await testServer
      .post("/registrar")
      .send({ nome: "teste", email, senha: "123456" });
    const resultSignIn = await testServer
      .post("/entrar")
      .send({ email, senha: "123456" });

    accessToken = resultSignIn.body.accessToken;
  });

  it("Should create the city and then get by id without access token", async () => {
    const result = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Serro" });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resultGetted = await testServer.get(`/cities/${result.body}`).send();

    expect(resultGetted.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resultGetted.body).toHaveProperty("errors.default");
  });

  it("Should create the city and then get by id", async () => {
    const result = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Serro" });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resultGetted = await testServer
      .get(`/cities/${result.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resultGetted.statusCode).toEqual(StatusCodes.OK);
    expect(resultGetted.body).toHaveProperty("nome");
  });

  it("Should try to get a city that don't exist", async () => {
    const result = await testServer
      .get("/cities/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toHaveProperty("errors.default");
  });
});
