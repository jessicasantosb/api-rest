import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - GetById", () => {
  let cidadeId: number | undefined = undefined;
  let accessToken = "";

  beforeAll(async () => {
    const email = "get_person_by_idple@email.com";
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

  it("Should create the person and then get by id without access token", async () => {
    const resultCreated = await testServer
      .post("/people")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Teste", email: "noaccestoken@email.com", cidadeId });

    expect(resultCreated.statusCode).toEqual(StatusCodes.CREATED);

    const resultGetted = await testServer
      .get(`/people/${resultCreated.body}`)
      .send();

    expect(resultGetted.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resultGetted.body).toHaveProperty("errors.default");
  });

  it("Should create the person and then get by id", async () => {
    const resultCreated = await testServer
      .post("/people")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Alice", email: "alice@email.com", cidadeId });

    expect(resultCreated.statusCode).toEqual(StatusCodes.CREATED);

    const resultGetted = await testServer
      .get(`/people/${resultCreated.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resultGetted.statusCode).toEqual(StatusCodes.OK);
    expect(resultGetted.body).toHaveProperty("nome");
    expect(resultGetted.body).toHaveProperty("email");
    expect(resultGetted.body).toHaveProperty("cidadeId");
  });

  it("Should try to get a person that don't exist", async () => {
    const result = await testServer
      .get("/people/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toHaveProperty("errors.default");
  });
});
