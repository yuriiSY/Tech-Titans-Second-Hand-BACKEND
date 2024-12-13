import express from "express";
import {
  getCars,
  getAllUserCars,
  getOneCars,
  deleteCar,
  createCar,
  updateCar,
  updateStatusCar,
  getCarsFavorites,
  getCarsListByName,
} from "../controllers/carsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createCarSchema,
  updateCarSchema,
  updateCarStatusSchema,
} from "../schemas/carsSchemas.js";
import isValidId from "../midlewares/isValidId.js";
import authenticate from "../midlewares/authenticate.js";
import upload from "../midlewares/upload.js";

const carsRouter = express.Router();

carsRouter.get("/favorite", getCarsFavorites);

carsRouter.get("/", getCars);

carsRouter.get("/search", getCarsListByName);

carsRouter.post(
  "/",
  upload.single("img"),
  validateBody(createCarSchema),
  createCar
);

carsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateCarStatusSchema),
  updateStatusCar
);

carsRouter.delete("/:id", isValidId, deleteCar);

carsRouter.use(authenticate);

carsRouter.get("/mycars", getAllUserCars);

carsRouter.get("/:id", isValidId, getOneCars);

carsRouter.put("/:id", isValidId, validateBody(updateCarSchema), updateCar);

export default carsRouter;
