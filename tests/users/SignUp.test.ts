import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("User - SignUp", () => {
  it("Should try to create a new user", async () => {
    const resultCreated = await testServer
      .post("/registrar")
      .send({ nome: "newuser", email: "newuser@email.com", senha: "123456" });

    expect(resultCreated.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resultCreated.body).toEqual("number");
  });

  it("Should try to create a second new user", async () => {
    const resultCreated = await testServer
      .post("/registrar")
      .send({ nome: "newuser2", email: "newuser2@email.com", senha: "123456" });

    expect(resultCreated.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resultCreated.body).toEqual("number");
  });

  it("Should try to create a new user with duplicated email", async () => {
    const resultCreated1 = await testServer
      .post("/registrar")
      .send({ nome: "newuser", email: "duplicated@email.com", senha: "123456" });

    expect(resultCreated1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resultCreated1.body).toEqual("number");

    const resultCreated2 = await testServer
      .post("/registrar")
      .send({
        nome: "newuser",
        email: "duplicated@email.com",
        senha: "123456",
      });

    expect(resultCreated2.statusCode).toEqual(
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    expect(resultCreated2.body).toHaveProperty("errors.default");
  });

  it("Should try to create a new user without name", async () => {
    const resultCreated = await testServer
      .post("/registrar")
      .send({ email: "newuser@email.com", senha: "123456" });

    expect(resultCreated.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resultCreated.body).toHaveProperty("errors.body.nome");
  });

  it("Should try to create a new user with short name", async () => {
    const resultCreated = await testServer
      .post("/registrar")
      .send({ nome: "ne", email: "newuser@email.com", senha: "123456" });

    expect(resultCreated.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resultCreated.body).toHaveProperty("errors.body.nome");
  });

  it("Should try to create a new user with invalid name", async () => {
    const resultCreated = await testServer
      .post("/registrar")
      .send({ nome: ["newuser"], email: "newuser@email.com", senha: "123456" });

    expect(resultCreated.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resultCreated.body).toHaveProperty("errors.body.nome");
  });

  it("Should try to create a new user without email", async () => {
    const resultCreated = await testServer
      .post("/registrar")
      .send({ nome: "newuser", senha: "123456" });

    expect(resultCreated.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resultCreated.body).toHaveProperty("errors.body.email");
  });

  it("Should try to create a new user with short email", async () => {
    const resultCreated = await testServer
      .post("/registrar")
      .send({ nome: "newuser", email: "n@e.c", senha: "123456" });

    expect(resultCreated.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resultCreated.body).toHaveProperty("errors.body.email");
  });

  it("Should try to create a new user with invalid email", async () => {
    const resultCreated = await testServer
      .post("/registrar")
      .send({ nome: "newuser", email: 123, senha: "123456" });

    expect(resultCreated.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resultCreated.body).toHaveProperty("errors.body.email");
  });

  it("Should try to create a new user without password", async () => {
    const resultCreated = await testServer
      .post("/registrar")
      .send({ nome: "newuser", email: "newuser@email.com" });

    expect(resultCreated.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resultCreated.body).toHaveProperty("errors.body.senha");
  });

  it("Should try to create a new user with short password", async () => {
    const resultCreated = await testServer
      .post("/registrar")
      .send({ nome: "newuser", email: "newuser@email.com", senha: "123" });

    expect(resultCreated.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resultCreated.body).toHaveProperty("errors.body.senha");
  });

  it("Should try to create a new user with invalid password", async () => {
    const resultCreated = await testServer
      .post("/registrar")
      .send({ nome: "newuser", email: "newuser@email.com", senha: 123 });

    expect(resultCreated.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resultCreated.body).toHaveProperty("errors.body.senha");
  });
});
