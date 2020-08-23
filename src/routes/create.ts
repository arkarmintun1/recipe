import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { Recipe } from "../models/recipe";

const router = express.Router();

router.post(
  "/api/recipes",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("ingredients.*.name")
      .notEmpty()
      .withMessage("Ingredient name is required"),
    body("ingredients.*.amount")
      .notEmpty()
      .withMessage("Ingredient amount is required"),
    body("steps").notEmpty().isArray().withMessage("Steps is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, description, ingredients, steps } = req.body;
    const recipe = Recipe.build({ title, description, ingredients, steps });
    await recipe.save();

    res.status(201).send(recipe);
  }
);

export { router as createRecipeRouter };
