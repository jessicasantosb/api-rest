import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - UpdateById", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "update_city_by_id@email.com";
    await testServer
      .post("/registrar")
      .send({ nome: "teste", email, senha: "123456" });
    const resultSignIn = await testServer
      .post("/entrar")
      .send({ email, senha: "123456" });

    accessToken = resultSignIn.body.accessToken;
  });

  it("Should create the city and then update without access token", async () => {
    const result = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Serro" });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resultUpdated = await testServer
      .put(`/cities/${result.body}`)
      .send({ nome: "Diamantina" });

    expect(resultUpdated.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resultUpdated.body).toHaveProperty("errors.default");
  });

  it("Should create the city and then update", async () => {
    const result = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Serro" });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resultUpdated = await testServer
      .put(`/cities/${result.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Diamantina" });

    expect(resultUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Should try to update a city that don't exist", async () => {
    const result = await testServer
      .put("/cities/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Diamantina" });

    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toHaveProperty("errors.default");
  });
});
