import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("User - SignIn", () => {
  beforeAll(async () => {
    await testServer
      .post("/registrar")
      .send({ nome: "user", email: "user@email.com", senha: "123456" });
  });

  it("Should try to sigin an user", async () => {
    const result = await testServer
      .post("/entrar")
      .send({ email: "user@email.com", senha: "123456" });

    expect(result.statusCode).toEqual(StatusCodes.OK);
    expect(result.body).toHaveProperty("accessToken");
  });

  it("Should try to sigin an user without email", async () => {
    const result = await testServer.post("/entrar").send({ senha: "123456" });

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.email");
  });

  it("Should try to sigin an user with wrong email", async () => {
    const result = await testServer
      .post("/entrar")
      .send({ email: "wrong@email.com", senha: "123456" });

    expect(result.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(result.body).toHaveProperty("errors.default");
  });

  it("Should try to sigin an user with short email", async () => {
    const result = await testServer
      .post("/entrar")
      .send({ email: "u@e.c", senha: "123456" });

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.email");
  });

  it("Should try to sigin an user with invalid email", async () => {
    const result = await testServer
      .post("/entrar")
      .send({ email: "invalid email.com", senha: "123456" });

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.email");
  });

  it("Should try to sigin an user without password", async () => {
    const result = await testServer
      .post("/entrar")
      .send({ email: "user@email.com" });

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.senha");
  });

  it("Should try to sigin an user with wrong password", async () => {
    const result = await testServer
      .post("/entrar")
      .send({ email: "user@email.com", senha: "1234567" });

    expect(result.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(result.body).toHaveProperty("errors.default");
  });

  it("Should try to sigin an user with short password", async () => {
    const result = await testServer
      .post("/entrar")
      .send({ email: "user@email.com", senha: "123" });

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.senha");
  });
});
