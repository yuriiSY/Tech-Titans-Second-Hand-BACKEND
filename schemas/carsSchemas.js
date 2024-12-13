import Joi from "joi";
import { model } from "mongoose";

export const createCarSchema = Joi.object({
  name: Joi.string(),
  color: Joi.string(),
  model: Joi.string(),
  year: Joi.string(),
  mileage: Joi.string(),
  city: Joi.string(),
});

export const updateCarSchema = Joi.object({
  name: Joi.string(),
  color: Joi.string(),
  model: Joi.string(),
  year: Joi.string(),
  mileage: Joi.string(),
  city: Joi.string(),
})
  .min(1)
  .required()
  .messages({ "object.min": "You must have at least 1 field" });

export const updateCarStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
