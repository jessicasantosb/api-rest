import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - Create", () => {
  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resultCity = await testServer.post("/cities").send({ nome: "Serro" });
    cidadeId = resultCity.body;
  });

  it("Should create a new person", async () => {
    const result = await testServer
      .post("/people")
      .send({ nome: "Alice", email: "alice@email.com", cidadeId });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof result.body).toEqual("number");
  });

  it("Should create a second new person", async () => {
    const result = await testServer
      .post("/people")
      .send({ nome: "João", email: "joao@email.com", cidadeId });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof result.body).toEqual("number");
  });

  it("Should create a new person with duplicated email", async () => {
    const result = await testServer
      .post("/people")
      .send({ nome: "João", email: "duplicated@email.com", cidadeId });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof result.body).toEqual("number");

    const result2 = await testServer.post("/people").send({
      nome: "duplicated",
      email: "duplicated@email.com",
      cidadeId,
    });

    expect(result2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result2.body).toHaveProperty("errors.default");
  });

  it("Should create a new person with short name", async () => {
    const res1 = await testServer
      .post("/people")
      .send({ nome: "Ju", email: "teste@email.com", cidadeId });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nome");
  });

  it("Should create a new person without name property", async () => {
    const result = await testServer
      .post("/people")
      .send({ email: "teste@email.com", cidadeId });

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.nome");
  });

  it("Should create a new person an invalid name property", async () => {
    const result = await testServer
      .post("/people")
      .send({ name: 123, email: "teste@email.com", cidadeId });

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.nome");
  });

  it("Should create a new person without email property", async () => {
    const result = await testServer
      .post("/people")
      .send({ nome: "Teste", cidadeId });

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.email");
  });

  it("Should create a new person with an invalid email property", async () => {
    const result = await testServer
      .post("/people")
      .send({ nome: "Teste", email: "teste email.com", cidadeId });

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.email");
  });

  it("Should create a new person without cidadeId property", async () => {
    const result = await testServer
      .post("/people")
      .send({ nome: "Teste", email: "teste@email.com" });

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.cidadeId");
  });

  it("Should create a new person an invalid cidadeId property", async () => {
    const result = await testServer.post("/people").send({
      nome: "Teste",
      email: "invalidcidadeid@email.com",
      cidadeId: "teste",
    });

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.cidadeId");
  });

  it("Should create a new person without properties", async () => {
    const result = await testServer.post("/people").send({});

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.nome");
    expect(result.body).toHaveProperty("errors.body.email");
    expect(result.body).toHaveProperty("errors.body.cidadeId");
  });
});
