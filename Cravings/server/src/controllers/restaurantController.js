import Menu from "../models/menuSchema.js";
import { UploadMultipleToCloudinary } from "../utils/imageUploader.js";

export const RestaurantAddMenuItem = async (req, res, next) => {
  try {
    const {
      itemName,
      description,
      price,
      type,
      preparationTime,
      availability,
      servingSize,
      cuisine,
    } = req.body;

    const CurrentUser = req.user;

    if (
      !itemName ||
      !description ||
      !price ||
      !type ||
      !preparationTime ||
      !availability ||
      !servingSize ||
      !cuisine
    ) {
      const error = new Error("All Fields are Required");
      error.statusCode = 400;
      return next(error);
    }

    const images = await UploadMultipleToCloudinary(req.files);
    console.log(images);

    const newMenuItem = await Menu.create({
      itemName,
      description,
      price,
      type,
      preparationTime,
      availability,
      servingSize,
      cuisine,
      images,
      resturantID: CurrentUser._id,
    });

    res.status(201).json({
      message: "Menu Item Added Successfully",
      data: newMenuItem,
    });
  } catch (error) {
    next(error);
  }
};
export const RestaurantEditMenuItem = async (req, res, next) => {
  try {
    const {
      itemName,
      description,
      price,
      type,
      preparationTime,
      availability,
      servingSize,
      cuisine,
    } = req.body;

    const { id } = req.params;

    const CurrentUser = req.user;

    if (
      !itemName ||
      !description ||
      !price ||
      !type ||
      !preparationTime ||
      !availability ||
      !servingSize ||
      !cuisine
    ) {
      const error = new Error("All Fields are Required");
      error.statusCode = 400;
      return next(error);
    }

    let images = [];
    if (req.files) {
      images = await UploadMultipleToCloudinary(req.files);
      console.log(images);
    }

    const existingMenuItem = await Menu.findById(id);

    existingMenuItem.itemName = itemName || existingMenuItem.itemName;
    existingMenuItem.description = description || existingMenuItem.description;
    existingMenuItem.price = price || existingMenuItem.price;
    existingMenuItem.type = type || existingMenuItem.type;
    existingMenuItem.preparationTime =
      preparationTime || existingMenuItem.preparationTime;
    existingMenuItem.availability =
      availability || existingMenuItem.availability;
    existingMenuItem.servingSize = servingSize || existingMenuItem.servingSize;
    existingMenuItem.cuisine = cuisine || existingMenuItem.cuisine;
    existingMenuItem.images =
      images.length > 0 ? images : existingMenuItem.images;
    await existingMenuItem.save();

    res.status(201).json({
      message: "Menu Item Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const GetRestaurantMenuItem = async (req, res, next) => {
  try {
    const CurrentUser = req.user;

    const menuItems = await Menu.find({ resturantID: CurrentUser._id });

    res.status(200).json({
      message: "Menu Items Fetched Successfully",
      data: menuItems,
    });
  } catch (error) {
    next(error);
  }
};