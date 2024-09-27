import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - DeleteById", () => {
  let cidadeId: number | undefined = undefined;
  let accessToken = "";

  beforeAll(async () => {
    const email = "delete_person@email.com";
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

  it("Should create the person and then delete without access token", async () => {
    const result = await testServer
      .post("/people")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Teste", email: "noaccestoken@email.com", cidadeId });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resultDeleted = await testServer
      .delete(`/people/${result.body}`)
      .send();

    expect(resultDeleted.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resultDeleted.body).toHaveProperty("errors.default");
  });

  it("Should create the person and then delete", async () => {
    const result = await testServer
      .post("/people")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "João", email: "teste@email.com", cidadeId });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resultDeleted = await testServer
      .delete(`/people/${result.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resultDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Should try to delete a person that don't exist", async () => {
    const result = await testServer
      .delete("/people/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toHaveProperty("errors.default");
  });
});
