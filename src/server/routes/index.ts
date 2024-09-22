import { Router } from "express";
import { CitiesControllers } from "../controllers";

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

export { router };
