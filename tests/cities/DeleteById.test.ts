import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities = DeleteById", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "delete_cities@email.com";
    await testServer
      .post("/registrar")
      .send({ nome: "teste", email, senha: "123456" });
    const resultSignIn = await testServer
      .post("/entrar")
      .send({ email, senha: "123456" });

    accessToken = resultSignIn.body.accessToken;
  });

  it("Should try to delete the city without access token", async () => {
    const result = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Serro" });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resultDeleted = await testServer
      .delete(`/cities/${result.body}`)
      .send();

    expect(resultDeleted.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resultDeleted.body).toHaveProperty("errors.default");
  });

  it("Should try to create the city and then delete", async () => {
    const result = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Serro" });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resultDeleted = await testServer
      .delete(`/cities/${result.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resultDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Should try to delete a city that don't exist", async () => {
    const resultDeleted = await testServer
      .delete("/cities/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resultDeleted.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resultDeleted.body).toHaveProperty("errors.default");
  });
});
