import { Router } from "express";

import {
  CitiesControllers,
  PeopleControllers,
  UsersControllers,
} from "../controllers";
import { ensureAuthenticated } from "../shared/middleware";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Hello world");
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
