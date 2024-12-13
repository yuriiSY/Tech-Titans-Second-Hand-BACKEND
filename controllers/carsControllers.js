import * as carsService from "../services/carsServices.js";
import HttpError from "../helpers/HttpError.js";
import path from "path";
import fs from "fs/promises";
import gravatar from "gravatar";
import Jimp from "jimp";

const carsImgPath = path.resolve("public", "cars");

export const getCars = async (_, res, next) => {
  try {
    const result = await carsService.getCars();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getCarsFavorites = async (_, res, next) => {
  try {
    const result = await carsService.getFavoritesCars();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getCarsListByName = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await carsService.getCarsByName(name);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllUserCars = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await carsService.listCars({ owner });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneCars = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await carsService.getCarByFilter({ owner, _id: id });

    if (!result) {
      throw HttpError(404, `Car with ${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const { _id: owner } = req.user;
    const result = await carsService.removeCar({ _id: id });

    if (!result) {
      throw HttpError(404, `Car with ${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createCar = async (req, res, next) => {
  try {
    const body = req.body;
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(carsImgPath, filename);
    await fs.rename(oldPath, newPath);
    const img = path.join("public", "cars", filename);
    // const { _id: owner } = req.user;
    console.log(req.file);
    const result = await carsService.addCar({ ...body, img });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateCar = async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await carsService.updateCar({ owner, _id: id }, body);
    if (!result) {
      throw HttpError(404, `Car with ${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateStatusCar = async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;
    //const { _id: owner } = req.user;
    const result = await carsService.updateStatusCar({ _id: id }, body);
    if (!result) {
      throw HttpError(404, `Car with ${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
