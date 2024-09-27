import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - Create", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "create_cities@email.com";
    await testServer
      .post("/registrar")
      .send({ nome: "teste", email, senha: "123456" });
    const resultSignIn = await testServer
      .post("/entrar")
      .send({ email, senha: "123456" });

    accessToken = resultSignIn.body.accessToken;
  });

  it("Should try to create a new city without access token", async () => {
    const res1 = await testServer.post("/cities").send({ nome: "Serro" });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Should try to create a new city", async () => {
    const res1 = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Serro" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("Should try to create a new city with short name", async () => {
    const res1 = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Se" });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nome");
  });

  it("Should try to create a new city without name property", async () => {
    const res1 = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nome");
  });
});
