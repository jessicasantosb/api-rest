import { Router } from "express";

import {
  CitiesControllers,
  PeopleControllers,
  UsersControllers,
} from "../controllers";
import { ensureAuthenticated } from "../shared/middleware";
import { PORT } from "../utils/port";

const router = Router();

router.get("/", (req, res) => {
  return res.send(`
    <html>
      <body style="background: #533B4D; color: #FAA4BD; width: 100%; min-height: 100dvh; text-align: center; padding-top: 7rem;">
        <h1 style="color: #4CAF50; font-size: 3rem">Conexão estabelecida. Olá, mundo! 🌍</h1>
        <p style="font-size: 1.5rem">API está rodando e disponível em: <a href="http://localhost:${PORT}" style="color: #FFD700">http://localhost:${PORT}</a></p>
      </body>
    </html>`);
});

router.get(
  "/cities",
  ensureAuthenticated,
  CitiesControllers.getAllBodyValidation,
  CitiesControllers.getAll
);
router.post(
  "/cities",
  ensureAuthenticated,
  CitiesControllers.createBodyValidation,
  CitiesControllers.create
);
router.get(
  "/cities/:id",
  ensureAuthenticated,
  CitiesControllers.getByIdBodyValidation,
  CitiesControllers.getById
);
router.put(
  "/cities/:id",
  ensureAuthenticated,
  CitiesControllers.updateByIdBodyValidation,
  CitiesControllers.updateById
);
router.delete(
  "/cities/:id",
  ensureAuthenticated,
  CitiesControllers.deleteByIdBodyValidation,
  CitiesControllers.deleteById
);

router.get(
  "/people",
  ensureAuthenticated,
  PeopleControllers.getAllBodyValidation,
  PeopleControllers.getAll
);
router.post(
  "/people",
  ensureAuthenticated,
  PeopleControllers.createBodyValidation,
  PeopleControllers.create
);
router.get(
  "/people/:id",
  ensureAuthenticated,
  PeopleControllers.getByIdBodyValidation,
  PeopleControllers.getById
);
router.put(
  "/people/:id",
  ensureAuthenticated,
  PeopleControllers.updateByIdBodyValidation,
  PeopleControllers.updateById
);
router.delete(
  "/people/:id",
  ensureAuthenticated,
  PeopleControllers.deleteByIdBodyValidation,
  PeopleControllers.deleteById
);

router.post(
  "/entrar",
  UsersControllers.signInBodyValidation,
  UsersControllers.signIn
);
router.post(
  "/registrar",
  UsersControllers.signUpBodyValidation,
  UsersControllers.signUp
);

export { router };
