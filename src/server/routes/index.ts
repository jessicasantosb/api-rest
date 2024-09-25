import { Router } from "express";
import { CitiesControllers, PeopleControllers } from "../controllers";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Hello world");
});

router.get(
  "/cities",
  CitiesControllers.getAllBodyValidation,
  CitiesControllers.getAll
);
router.post(
  "/cities",
  CitiesControllers.createBodyValidation,
  CitiesControllers.create
);
router.get(
  "/cities/:id",
  CitiesControllers.getByIdBodyValidation,
  CitiesControllers.getById
);
router.put(
  "/cities/:id",
  CitiesControllers.updateByIdBodyValidation,
  CitiesControllers.updateById
);
router.delete(
  "/cities/:id",
  CitiesControllers.deleteByIdBodyValidation,
  CitiesControllers.deleteById
);

router.post(
  "/people",
  PeopleControllers.createBodyValidation,
  PeopleControllers.create
);

export { router };
